const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../db');

// In-memory tracker for rate limiting failed face login attempts per IP address
const failedFaceAttempts = {}; // key: ip, value: { count, lockUntil }

// Helper function to calculate Euclidean distance between two descriptors (Float32Arrays/Arrays)
function euclideanDistance(arr1, arr2) {
  if (arr1.length !== arr2.length) return Infinity;
  let sum = 0;
  for (let i = 0; i < arr1.length; i++) {
    const diff = arr1[i] - arr2[i];
    sum += diff * diff;
  }
  return Math.sqrt(sum);
}

// 1. Check if face authentication has been configured anywhere in the system
const checkFaceStatus = async (req, res) => {
  try {
    const activeFaces = await prisma.user.count({
      where: {
        faceAuthEnabled: true,
        faceDescriptor: { not: null }
      }
    });

    res.json({ hasRegisteredFaces: activeFaces > 0 });
  } catch (error) {
    console.error('[Face Auth checkFaceStatus Error]', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// 2. Authenticate user using a scanned face descriptor
const loginWithFace = async (req, res) => {
  const { descriptor } = req.body;
  const ip = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';

  // Rate limit / Lockout check
  const record = failedFaceAttempts[ip];
  if (record && record.lockUntil && record.lockUntil > Date.now()) {
    const remainingMinutes = Math.ceil((record.lockUntil - Date.now()) / 60000);
    return res.status(429).json({
      message: `Too many failed face login attempts. Face login is locked. Try again in ${remainingMinutes} minutes, or use Password fallback.`
    });
  }

  if (!descriptor || !Array.isArray(descriptor) || descriptor.length === 0) {
    return res.status(400).json({ message: 'Face descriptor is required' });
  }

  try {
    // Retrieve HOD and SUB_ADMIN users with active face authentication
    const users = await prisma.user.findMany({
      where: {
        faceAuthEnabled: true,
        faceDescriptor: { not: null },
        role: { in: ['HOD', 'SUB_ADMIN'] }
      }
    });

    let bestMatch = null;
    let minDistance = Infinity;

    for (const user of users) {
      try {
        const storedDescriptor = JSON.parse(user.faceDescriptor);
        const distance = euclideanDistance(descriptor, storedDescriptor);
        if (distance < minDistance) {
          minDistance = distance;
          bestMatch = user;
        }
      } catch (e) {
        console.error(`Error parsing face descriptor for user ${user.userId}:`, e);
      }
    }

    // Match threshold for face-api.js is usually 0.6
    const MATCH_THRESHOLD = 0.6;

    if (bestMatch && minDistance < MATCH_THRESHOLD) {
      // Clear failed attempts upon successful login
      delete failedFaceAttempts[ip];

      // CR role block checking (mirroring auth.controller.js)
      if (bestMatch.role === 'CR') {
        const trackingSetting = await prisma.systemSetting.findUnique({
          where: { key: 'trackingEnabled' },
        });
        const trackingEnabled = trackingSetting ? trackingSetting.value === 'true' : true;

        if (!trackingEnabled) {
          return res.status(403).json({ message: 'Tracking is disabled. College is on Holiday.' });
        }
      }

      // Create JWT Token
      const token = jwt.sign(
        {
          id: bestMatch.id,
          userId: bestMatch.userId,
          role: bestMatch.role,
          name: bestMatch.name,
          className: bestMatch.className,
        },
        process.env.JWT_SECRET || 'supersecret_facultytrackerkey_2026',
        { expiresIn: '24h' }
      );

      // Log success audit log
      await prisma.faceAuditLog.create({
        data: {
          userId: bestMatch.userId,
          action: 'LOGIN_SUCCESS',
          details: `Face authenticated with distance ${minDistance.toFixed(4)}`,
          ipAddress: ip
        }
      });

      res.json({
        token,
        user: {
          id: bestMatch.id,
          userId: bestMatch.userId,
          name: bestMatch.name,
          role: bestMatch.role,
          className: bestMatch.className,
        }
      });
    } else {
      // Increment failed count
      if (!failedFaceAttempts[ip]) {
        failedFaceAttempts[ip] = { count: 0, lockUntil: null };
      }
      failedFaceAttempts[ip].count += 1;

      // Lockout on 5th consecutive failure
      if (failedFaceAttempts[ip].count >= 5) {
        failedFaceAttempts[ip].lockUntil = Date.now() + 15 * 60 * 1000; // 15 min lock
      }

      // Determine who was closest to log for security audits (if distance is reasonable, else UNKNOWN)
      const closestUserId = (bestMatch && minDistance < 1.0) ? bestMatch.userId : 'UNKNOWN';

      await prisma.faceAuditLog.create({
        data: {
          userId: closestUserId,
          action: 'LOGIN_FAILURE',
          details: `Failed face login. Distance: ${minDistance.toFixed(4)}. Consecutive failures for IP: ${failedFaceAttempts[ip].count}`,
          ipAddress: ip
        }
      });

      res.status(401).json({
        message: 'Face not recognized. Please adjust lighting or try again.'
      });
    }
  } catch (error) {
    console.error('[Face Auth loginWithFace Error]', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// 3. Get Face settings and audit logs for currently logged in user
const getFaceSettings = async (req, res) => {
  const currentUserId = req.user.id;

  try {
    const user = await prisma.user.findUnique({
      where: { id: currentUserId }
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Retrieve face audit logs for this user
    const auditLogs = await prisma.faceAuditLog.findMany({
      where: { userId: user.userId },
      orderBy: { createdAt: 'desc' },
      take: 10
    });

    const currentMonth = new Date().toISOString().slice(0, 7);
    let currentUsageCount = user.faceUpdateCount;

    // Auto reset counter at start of calendar month
    if (user.faceUpdateMonth && user.faceUpdateMonth !== currentMonth) {
      currentUsageCount = 0;
      await prisma.user.update({
        where: { id: currentUserId },
        data: {
          faceUpdateCount: 0,
          faceUpdateMonth: currentMonth
        }
      });
    }

    res.json({
      faceAuthEnabled: user.faceAuthEnabled,
      hasFaceDescriptor: user.faceDescriptor !== null,
      faceRegisteredAt: user.faceRegisteredAt,
      faceUpdatedAt: user.faceUpdatedAt,
      remainingChanges: Math.max(0, 3 - currentUsageCount),
      faceUpdateCount: currentUsageCount,
      auditLogs
    });
  } catch (error) {
    console.error('[Face Auth getFaceSettings Error]', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// 4. Register face descriptor for the first time (FREE)
const registerFace = async (req, res) => {
  const currentUserId = req.user.id;
  const { password, descriptor } = req.body;
  const ip = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';

  if (!password || !descriptor || !Array.isArray(descriptor)) {
    return res.status(400).json({ message: 'Password and face descriptor are required' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: currentUserId }
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Require password verification
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password verification' });
    }

    // Verify it is a first-time registration
    if (user.faceDescriptor) {
      return res.status(400).json({ message: 'Face already registered. Please use Update Face.' });
    }

    const currentMonth = new Date().toISOString().slice(0, 7);

    // Save descriptor (FREE: counts remain 0)
    await prisma.user.update({
      where: { id: currentUserId },
      data: {
        faceDescriptor: JSON.stringify(descriptor),
        faceAuthEnabled: true,
        faceRegisteredAt: new Date(),
        faceUpdatedAt: new Date(),
        faceUpdateCount: 0,
        faceUpdateMonth: currentMonth
      }
    });

    // Create Audit Log
    await prisma.faceAuditLog.create({
      data: {
        userId: user.userId,
        action: 'REGISTRATION',
        details: 'Initial face authentication setup completed (FREE)',
        ipAddress: ip
      }
    });

    res.json({ message: 'Face registered successfully!' });
  } catch (error) {
    console.error('[Face Auth registerFace Error]', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// 5. Update face descriptor (Counts towards monthly limit: 3/month)
const updateFace = async (req, res) => {
  const currentUserId = req.user.id;
  const { password, descriptor } = req.body;
  const ip = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';

  if (!password || !descriptor || !Array.isArray(descriptor)) {
    return res.status(400).json({ message: 'Password and new face descriptor are required' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: currentUserId }
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Require password verification
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password verification' });
    }

    // Check if face is registered
    if (!user.faceDescriptor) {
      return res.status(400).json({ message: 'No face registered. Please register first.' });
    }

    const currentMonth = new Date().toISOString().slice(0, 7);
    let count = user.faceUpdateCount;

    // Reset if it's a new month
    if (user.faceUpdateMonth !== currentMonth) {
      count = 0;
    }

    // Validate monthly usage policy (max 3 updates per calendar month)
    if (count >= 3) {
      return res.status(400).json({
        message: 'Maximum monthly face update limit reached. You can update your face again next month.'
      });
    }

    const newCount = count + 1;

    // Update descriptor and increment counter
    await prisma.user.update({
      where: { id: currentUserId },
      data: {
        faceDescriptor: JSON.stringify(descriptor),
        faceUpdatedAt: new Date(),
        faceUpdateCount: newCount,
        faceUpdateMonth: currentMonth
      }
    });

    // Create Audit Log
    await prisma.faceAuditLog.create({
      data: {
        userId: user.userId,
        action: 'UPDATE',
        details: `Face updated successfully. Month: ${currentMonth}. Usage: ${newCount}/3`,
        ipAddress: ip
      }
    });

    res.json({
      message: 'Face updated successfully!',
      remainingChanges: 3 - newCount
    });
  } catch (error) {
    console.error('[Face Auth updateFace Error]', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// 6. Remove face descriptor (FREE, resets limits)
const removeFace = async (req, res) => {
  const currentUserId = req.user.id;
  const { password } = req.body;
  const ip = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';

  if (!password) {
    return res.status(400).json({ message: 'Password is required' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: currentUserId }
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Require password verification
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password verification' });
    }

    // Clear Face Authentication settings
    await prisma.user.update({
      where: { id: currentUserId },
      data: {
        faceDescriptor: null,
        faceAuthEnabled: false,
        faceRegisteredAt: null,
        faceUpdatedAt: null,
        faceUpdateCount: 0,
        faceUpdateMonth: null
      }
    });

    // Create Audit Log
    await prisma.faceAuditLog.create({
      data: {
        userId: user.userId,
        action: 'REMOVAL',
        details: 'Face authentication profile removed',
        ipAddress: ip
      }
    });

    res.json({ message: 'Face authentication profile removed successfully.' });
  } catch (error) {
    console.error('[Face Auth removeFace Error]', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// 7. Toggle Face Authentication enabled / disabled status
const toggleFaceAuth = async (req, res) => {
  const currentUserId = req.user.id;
  const { enabled } = req.body;
  const ip = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';

  if (enabled === undefined) {
    return res.status(400).json({ message: 'Enabled value is required' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: currentUserId }
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (enabled && !user.faceDescriptor) {
      return res.status(400).json({ message: 'Please register your face before enabling Face Authentication.' });
    }

    await prisma.user.update({
      where: { id: currentUserId },
      data: { faceAuthEnabled: enabled }
    });

    // Log to Audit Log
    await prisma.faceAuditLog.create({
      data: {
        userId: user.userId,
        action: enabled ? 'TOGGLE_ON' : 'TOGGLE_OFF',
        details: `Face authentication status toggled: ${enabled ? 'ENABLED' : 'DISABLED'}`,
        ipAddress: ip
      }
    });

    res.json({ message: `Face Authentication has been ${enabled ? 'enabled' : 'disabled'}.` });
  } catch (error) {
    console.error('[Face Auth toggleFaceAuth Error]', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  checkFaceStatus,
  loginWithFace,
  getFaceSettings,
  registerFace,
  updateFace,
  removeFace,
  toggleFaceAuth
};
