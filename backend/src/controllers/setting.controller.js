const prisma = require('../db');
const { getIo } = require('../services/socket.service');
const { getLocalDayBounds } = require('../utils/date');

const getTrackingStatus = async (req, res) => {
  try {
    const setting = await prisma.systemSetting.findUnique({
      where: { key: 'trackingEnabled' },
    });
    const trackingEnabled = setting ? setting.value === 'true' : true;
    res.json({ trackingEnabled });
  } catch (error) {
    console.error('Error getting tracking status:', error);
    res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
};

const updateTrackingStatus = async (req, res) => {
  const { trackingEnabled } = req.body;

  if (trackingEnabled === undefined) {
    return res.status(400).json({ message: 'trackingEnabled parameter is required' });
  }

  try {
    const setting = await prisma.systemSetting.upsert({
      where: { key: 'trackingEnabled' },
      update: { value: String(trackingEnabled) },
      create: { key: 'trackingEnabled', value: String(trackingEnabled) },
    });

    const isEnabled = setting.value === 'true';

    // Broadcast tracking status update to all connected clients
    try {
      const io = getIo();
      io.emit('tracking_status_update', { trackingEnabled: isEnabled });
    } catch (err) {
      console.warn('[Socket] Socket.IO instance not initialized or active. Live toggle update skip.');
    }

    res.json({ trackingEnabled: isEnabled });
  } catch (error) {
    console.error('Error updating tracking status:', error);
    res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
};

const clearLogsHistory = async (req, res) => {
  const { action, classroomId, startDate, endDate } = req.body;

  if (!action) {
    return res.status(400).json({ message: 'Action is required to clear history' });
  }

  try {
    let deletedCount = 0;

    if (action === 'all') {
      const result = await prisma.facultyLog.deleteMany({});
      deletedCount = result.count;
    } else if (action === 'classroom') {
      if (!classroomId) {
        return res.status(400).json({ message: 'Classroom ID is required' });
      }
      const result = await prisma.facultyLog.deleteMany({
        where: { classroomId: parseInt(classroomId) },
      });
      deletedCount = result.count;
    } else if (action === 'date_range') {
      if (!startDate || !endDate) {
        return res.status(400).json({ message: 'Start date and End date are required for range clearance' });
      }
      const { start: startOfRange } = getLocalDayBounds(startDate);
      const { end: endOfRange } = getLocalDayBounds(endDate);

      const result = await prisma.facultyLog.deleteMany({
        where: {
          createdAt: {
            gte: startOfRange,
            lte: endOfRange,
          },
        },
      });
      deletedCount = result.count;
    } else {
      return res.status(400).json({ message: 'Invalid clear history action selection' });
    }

    // Broadcast update to force all active pages to refresh
    try {
      const io = getIo();
      io.emit('classroom_status_update', { cleared: true });
    } catch (err) {
      // socket.io not initialized
    }

    res.json({
      message: `Cleared ${deletedCount} log entries successfully.`,
      count: deletedCount,
    });
  } catch (error) {
    console.error('Error clearing logs history:', error);
    res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
};

module.exports = {
  getTrackingStatus,
  updateTrackingStatus,
  clearLogsHistory,
};
