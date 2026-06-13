const prisma = require('../db');
const { getTodayDay, getCurrentTimeInHHMM, getLocalDayBounds, STANDARD_PERIODS } = require('../utils/date');

const getClassrooms = async (req, res) => {
  try {
    const classrooms = await prisma.classroom.findMany({
      orderBy: { className: 'asc' },
    });

    const today = getTodayDay();
    const currentTime = getCurrentTimeInHHMM();

    const { start: startOfToday, end: endOfToday } = getLocalDayBounds();

    const logsToday = await prisma.facultyLog.findMany({
      where: {
        createdAt: {
          gte: startOfToday,
          lte: endOfToday,
        },
      },
    });

    // Find active period configuration from STANDARD_PERIODS
    const activePeriodConfig = STANDARD_PERIODS.find(
      (p) => p.startTime <= currentTime && currentTime < p.endTime
    );

    const result = [];

    for (const classroom of classrooms) {
      let status = 'No Active Period';
      let currentPeriodInfo = null;

      // Filter logs for this classroom in-memory
      const classroomLogs = logsToday.filter(l => l.classroomId === classroom.id);

      if (activePeriodConfig) {
        // Find matching log for the active period
        const log = classroomLogs.find(l => l.periodNo === activePeriodConfig.periodNo);

        if (log) {
          status = log.status; // 'Present' or 'Not Entered'
        } else {
          status = 'Pending'; // Active period but not marked yet
        }

        currentPeriodInfo = {
          periodNo: activePeriodConfig.periodNo,
          startTime: activePeriodConfig.startTime,
          endTime: activePeriodConfig.endTime,
          facultyName: 'Faculty',
          subjectName: 'Class',
          entryTime: log ? log.entryTime : null,
        };
      } else {
        // Fallback: check the latest completed period today
        const pastPeriods = STANDARD_PERIODS.filter((p) => p.endTime <= currentTime);
        if (pastPeriods.length > 0) {
          const latestPast = pastPeriods[pastPeriods.length - 1];
          const pastLog = classroomLogs.find(l => l.periodNo === latestPast.periodNo);

          status = pastLog ? pastLog.status : 'Not Entered';
          currentPeriodInfo = {
            periodNo: latestPast.periodNo,
            startTime: latestPast.startTime,
            endTime: latestPast.endTime,
            facultyName: 'Faculty',
            subjectName: 'Class',
            entryTime: pastLog ? pastLog.entryTime : null,
          };
        }
      }

      result.push({
        id: classroom.id,
        roomNumber: classroom.roomNumber,
        className: classroom.className,
        status,
        currentPeriod: currentPeriodInfo,
      });
    }

    res.json(result);
  } catch (error) {
    console.error('Error fetching classrooms:', error);
    res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
};

const createClassroom = async (req, res) => {
  const { roomNumber, className } = req.body;

  if (!roomNumber || !className) {
    return res.status(400).json({ message: 'Room number and class name are required' });
  }

  try {
    const existing = await prisma.classroom.findUnique({
      where: {
        roomNumber_className: { roomNumber, className },
      },
    });

    if (existing) {
      return res.status(400).json({ message: 'Classroom with this room number and class name already exists' });
    }

    const classroom = await prisma.classroom.create({
      data: { roomNumber, className },
    });

    res.status(201).json(classroom);
  } catch (error) {
    console.error('Error creating classroom:', error);
    res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
};

const deleteClassroom = async (req, res) => {
  const { id } = req.params;

  try {
    const classroom = await prisma.classroom.findUnique({
      where: { id: parseInt(id) },
    });

    if (!classroom) {
      return res.status(404).json({ message: 'Classroom not found' });
    }

    await prisma.classroom.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: 'Classroom deleted successfully' });
  } catch (error) {
    console.error('Error deleting classroom:', error);
    res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
};

const getClassroomDetails = async (req, res) => {
  const { id } = req.params;
  const { date } = req.query;

  try {
    const whereLogs = {};

    if (date) {
      const { start: startOfDay, end: endOfDay } = getLocalDayBounds(date);
      whereLogs.createdAt = {
        gte: startOfDay,
        lte: endOfDay,
      };
    }

    const classroom = await prisma.classroom.findUnique({
      where: { id: parseInt(id) },
      include: {
        timetables: {
          orderBy: [
            { day: 'asc' },
            { periodNo: 'asc' },
          ],
        },
        logs: {
          where: whereLogs,
          orderBy: { createdAt: 'desc' },
          take: 50, // Limit to recent logs
        },
      },
    });

    if (!classroom) {
      return res.status(404).json({ message: 'Classroom not found' });
    }

    res.json(classroom);
  } catch (error) {
    console.error('Error fetching classroom details:', error);
    res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
};

module.exports = {
  getClassrooms,
  createClassroom,
  deleteClassroom,
  getClassroomDetails,
};
