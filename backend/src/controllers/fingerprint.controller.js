const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../db');
const {
  generateRegistrationOptions,
  verifyRegistrationResponse,
  generateAuthenticationOptions,
  verifyAuthenticationResponse,
} = require('@simplewebauthn/server');

// Temporary in-memory cache to store WebAuthn challenges
// Key: userId, Value: { challenge, expiresAt }
const fingerprintChallenges = new Map();

// Helper to extract the Relying Party (RP) ID dynamically from request headers
const getRpId = (req) => {
  const host = req.headers.host || 'localhost';
  return host.split(':')[0];
};

// Helper to extract expected origin dynamically from request headers
const getExpectedOrigin = (req) => {
  const origin = req.headers.origin;
  if (origin) return origin;
  const referer = req.headers.referer;
  if (referer) {
    try {
      return new URL(referer).origin;
    } catch (e) {
      // ignore parsing error
    }
  }
  return 'http://localhost:3001';
};

// 1. Check if user ID has fingerprint enabled
const checkFingerprintStatus = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { userId },
    });

    const isEnabled = user ? user.fingerprintEnabled : false;
    return res.json({ hasFingerprint: isEnabled });
  } catch (error) {
    console.error('[Fingerprint checkFingerprintStatus Error]', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// 2. Generate fingerprint registration options (requires password)
const generateRegisterOptions = async (req, res) => {
  const currentUserId = req.user.id;
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ message: 'Password is required' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: currentUserId },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify user's account password first
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password verification' });
    }

    // Get current registered credential to exclude it from prompt
    const existingCredential = await prisma.fingerprint.findUnique({
      where: { userId: user.userId },
    });

    const excludeCredentials = [];
    if (existingCredential) {
      excludeCredentials.push({
        id: Buffer.from(existingCredential.credentialId, 'base64url'),
        type: 'public-key',
        transports: existingCredential.transports ? JSON.parse(existingCredential.transports) : undefined,
      });
    }

    const rpID = getRpId(req);

    const options = await generateRegistrationOptions({
      rpName: 'Faculty Tracker',
      rpID,
      userID: Buffer.from(user.userId, 'utf-8'),
      userName: user.userId,
      userDisplayName: user.name,
      attestationType: 'none',
      excludeCredentials,
      authenticatorSelection: {
        residentKey: 'preferred',
        userVerification: 'preferred',
        authenticatorAttachment: 'platform', // Built-in fingerprint scanner
      },
    });

    // Store challenge in memory
    fingerprintChallenges.set(user.userId, {
      challenge: options.challenge,
      expiresAt: Date.now() + 5 * 60 * 1000,
    });

    return res.json(options);
  } catch (error) {
    console.error('[Fingerprint generateRegisterOptions Error]', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// 3. Verify fingerprint registration response from browser
const verifyRegister = async (req, res) => {
  const currentUserId = req.user.id;
  const { response } = req.body;
  const ip = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';

  if (!response) {
    return res.status(400).json({ message: 'Registration response is required' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: currentUserId },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const challengeRecord = fingerprintChallenges.get(user.userId);
    if (!challengeRecord || challengeRecord.expiresAt < Date.now()) {
      return res.status(400).json({ message: 'Registration challenge expired or not found. Please try again.' });
    }

    // Clear challenge from memory
    fingerprintChallenges.delete(user.userId);

    const rpID = getRpId(req);
    const expectedOrigin = getExpectedOrigin(req);

    let verification;
    try {
      verification = await verifyRegistrationResponse({
        response,
        expectedChallenge: challengeRecord.challenge,
        expectedOrigin,
        expectedRPID: rpID,
      });
    } catch (e) {
      console.error('[WebAuthn Registration Verification Error]', e);
      return res.status(400).json({ message: `Fingerprint verification failed: ${e.message}` });
    }

    if (verification.verified && verification.registrationInfo) {
      const { credential, credentialDeviceType } = verification.registrationInfo;
      const { id, publicKey, counter } = credential;

      const credentialIdStr = typeof id === 'string' ? id : Buffer.from(id).toString('base64url');
      const publicKeyStr = typeof publicKey === 'string' ? publicKey : Buffer.from(publicKey).toString('base64url');
      
      // Extract transports from the response.response nested object
      const transportsStr = (response.response && response.response.transports)
        ? JSON.stringify(response.response.transports)
        : null;

      // Save credentials and enable fingerprint auth in a transaction
      await prisma.$transaction([
        prisma.fingerprint.upsert({
          where: { userId: user.userId },
          create: {
            userId: user.userId,
            credentialId: credentialIdStr,
            publicKey: publicKeyStr,
            counter: Number(counter),
            transports: transportsStr,
          },
          update: {
            credentialId: credentialIdStr,
            publicKey: publicKeyStr,
            counter: Number(counter),
            transports: transportsStr,
          },
        }),
        prisma.user.update({
          where: { id: currentUserId },
          data: { fingerprintEnabled: true },
        }),
        prisma.fingerprintAuditLog.create({
          data: {
            userId: user.userId,
            action: 'REGISTRATION',
            details: `Registered fingerprint credential. Device type: ${credentialDeviceType}`,
            ipAddress: ip,
          },
        }),
      ]);

      return res.json({ message: 'Fingerprint registered and enabled successfully!' });
    } else {
      return res.status(400).json({ message: 'Fingerprint registration was not verified.' });
    }
  } catch (error) {
    console.error('[Fingerprint verifyRegister Error]', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// 4. Generate fingerprint login options (userId is optional for usernameless discoverable credentials)
const generateLoginOptions = async (req, res) => {
  const { userId } = req.body;

  try {
    const rpID = getRpId(req);
    let options;

    if (userId) {
      // Direct User ID authentication options
      const user = await prisma.user.findUnique({
        where: { userId },
      });

      if (!user || !user.fingerprintEnabled) {
        return res.status(400).json({ message: 'Fingerprint login is not registered or enabled for this user.' });
      }

      const fingerprint = await prisma.fingerprint.findUnique({
        where: { userId: user.userId },
      });

      if (!fingerprint) {
        return res.status(400).json({ message: 'Fingerprint credentials not found for this user.' });
      }

      options = await generateAuthenticationOptions({
        rpID,
        allowCredentials: [
          {
            id: Buffer.from(fingerprint.credentialId, 'base64url'),
            type: 'public-key',
            transports: fingerprint.transports ? JSON.parse(fingerprint.transports) : undefined,
          },
        ],
        userVerification: 'required',
      });
    } else {
      // Usernameless (discoverable credentials) authentication options
      options = await generateAuthenticationOptions({
        rpID,
        userVerification: 'required',
      });
    }

    // Store challenge in memory, keyed by the challenge string itself
    fingerprintChallenges.set(options.challenge, {
      challenge: options.challenge,
      expiresAt: Date.now() + 5 * 60 * 1000,
    });

    return res.json(options);
  } catch (error) {
    console.error('[Fingerprint generateLoginOptions Error]', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// 5. Verify fingerprint login signature and authenticate user (usernameless lookups)
const verifyLogin = async (req, res) => {
  const { response, challenge } = req.body;
  const ip = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';

  if (!response || !challenge) {
    return res.status(400).json({ message: 'Authentication response and challenge are required' });
  }

  try {
    const credentialId = response.id;
    if (!credentialId) {
      return res.status(400).json({ message: 'Invalid authentication response structure' });
    }

    // Look up the credential in the database
    const fingerprint = await prisma.fingerprint.findFirst({
      where: { credentialId },
    });

    // Check if the credential is registered to an existing user
    if (!fingerprint) {
      return res.status(400).json({ message: 'You are not an official user.' });
    }

    const user = await prisma.user.findUnique({
      where: { userId: fingerprint.userId },
    });

    if (!user) {
      return res.status(400).json({ message: 'You are not an official user.' });
    }

    // Check if fingerprint login is enabled for this user
    if (!user.fingerprintEnabled) {
      return res.status(400).json({ message: 'Fingerprint login is disabled for this user.' });
    }

    const challengeRecord = fingerprintChallenges.get(challenge);
    if (!challengeRecord || challengeRecord.expiresAt < Date.now()) {
      return res.status(400).json({ message: 'Authentication challenge expired or not found. Please try again.' });
    }

    // Clear challenge from memory
    fingerprintChallenges.delete(challenge);

    const rpID = getRpId(req);
    const expectedOrigin = getExpectedOrigin(req);

    let verification;
    try {
      verification = await verifyAuthenticationResponse({
        response,
        expectedChallenge: challengeRecord.challenge,
        expectedOrigin,
        expectedRPID: rpID,
        credential: {
          id: Buffer.from(fingerprint.credentialId, 'base64url'),
          publicKey: Buffer.from(fingerprint.publicKey, 'base64url'),
          counter: fingerprint.counter,
          transports: fingerprint.transports ? JSON.parse(fingerprint.transports) : undefined,
        },
      });
    } catch (e) {
      console.error('[WebAuthn Login Verification Error]', e);
      // Log login failure
      await prisma.fingerprintAuditLog.create({
        data: {
          userId: user.userId,
          action: 'LOGIN_FAILURE',
          details: `Fingerprint login failed: ${e.message}`,
          ipAddress: ip,
        },
      });
      return res.status(400).json({ message: `Fingerprint authentication failed: ${e.message}` });
    }

    if (verification.verified && verification.authenticationInfo) {
      const { newCounter } = verification.authenticationInfo;

      // Update signature counter to prevent replays, and log success
      await prisma.$transaction([
        prisma.fingerprint.update({
          where: { userId: user.userId },
          data: { counter: Number(newCounter) },
        }),
        prisma.fingerprintAuditLog.create({
          data: {
            userId: user.userId,
            action: 'LOGIN_SUCCESS',
            details: 'Successfully authenticated with device biometrics.',
            ipAddress: ip,
          },
        }),
      ]);

      // Create JWT Token
      const token = jwt.sign(
        {
          id: user.id,
          userId: user.userId,
          role: user.role,
          name: user.name,
          className: user.className,
        },
        process.env.JWT_SECRET || 'supersecret_facultytrackerkey_2026',
        { expiresIn: '24h' }
      );

      return res.json({
        token,
        user: {
          id: user.id,
          userId: user.userId,
          name: user.name,
          role: user.role,
          className: user.className,
        },
      });
    } else {
      await prisma.fingerprintAuditLog.create({
        data: {
          userId: user.userId,
          action: 'LOGIN_FAILURE',
          details: 'Fingerprint authentication response was not verified.',
          ipAddress: ip,
        },
      });
      return res.status(400).json({ message: 'Fingerprint authentication was not verified.' });
    }
  } catch (error) {
    console.error('[Fingerprint verifyLogin Error]', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// 6. Get fingerprint configuration and recent audit logs
const getFingerprintSettings = async (req, res) => {
  const currentUserId = req.user.id;

  try {
    const user = await prisma.user.findUnique({
      where: { id: currentUserId },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const fingerprint = await prisma.fingerprint.findUnique({
      where: { userId: user.userId },
    });

    const auditLogs = await prisma.fingerprintAuditLog.findMany({
      where: { userId: user.userId },
      orderBy: { createdAt: 'desc' },
      take: 15,
    });

    return res.json({
      fingerprintEnabled: user.fingerprintEnabled,
      hasFingerprint: fingerprint !== null,
      fingerprintRegisteredAt: fingerprint ? fingerprint.createdAt : null,
      auditLogs,
    });
  } catch (error) {
    console.error('[Fingerprint getFingerprintSettings Error]', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// 7. Remove registered fingerprint
const removeFingerprint = async (req, res) => {
  const currentUserId = req.user.id;
  const { password } = req.body;
  const ip = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';

  if (!password) {
    return res.status(400).json({ message: 'Password is required' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: currentUserId },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password verification' });
    }

    await prisma.$transaction([
      prisma.fingerprint.deleteMany({
        where: { userId: user.userId },
      }),
      prisma.user.update({
        where: { id: currentUserId },
        data: { fingerprintEnabled: false },
      }),
      prisma.fingerprintAuditLog.create({
        data: {
          userId: user.userId,
          action: 'REMOVAL',
          details: 'Fingerprint biometrics profile deleted.',
          ipAddress: ip,
        },
      }),
    ]);

    return res.json({ message: 'Fingerprint credentials removed successfully.' });
  } catch (error) {
    console.error('[Fingerprint removeFingerprint Error]', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// 8. Toggle fingerprint logins status
const toggleFingerprint = async (req, res) => {
  const currentUserId = req.user.id;
  const { enabled } = req.body;
  const ip = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';

  if (enabled === undefined) {
    return res.status(400).json({ message: 'Enabled value is required' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: currentUserId },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const fingerprint = await prisma.fingerprint.findUnique({
      where: { userId: user.userId },
    });

    if (enabled && !fingerprint) {
      return res.status(400).json({ message: 'Please register your fingerprint before enabling Fingerprint Authentication.' });
    }

    await prisma.$transaction([
      prisma.user.update({
        where: { id: currentUserId },
        data: { fingerprintEnabled: enabled },
      }),
      prisma.fingerprintAuditLog.create({
        data: {
          userId: user.userId,
          action: enabled ? 'TOGGLE_ON' : 'TOGGLE_OFF',
          details: `Fingerprint logins status toggled: ${enabled ? 'ENABLED' : 'DISABLED'}`,
          ipAddress: ip,
        },
      }),
    ]);

    return res.json({ message: `Fingerprint Authentication has been ${enabled ? 'enabled' : 'disabled'}.` });
  } catch (error) {
    console.error('[Fingerprint toggleFingerprint Error]', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  checkFingerprintStatus,
  generateRegisterOptions,
  verifyRegister,
  generateLoginOptions,
  verifyLogin,
  getFingerprintSettings,
  removeFingerprint,
  toggleFingerprint,
};
