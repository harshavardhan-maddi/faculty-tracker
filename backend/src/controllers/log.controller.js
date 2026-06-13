const prisma = require('../db');
const { emitClassroomStatusUpdate, emitNotification } = require('../services/socket.service');
const { getTodayDay, getCurrentTimeInHHMM, getLocalDayBounds, STANDARD_PERIODS } = require('../utils/date');

const createEntryLog = async (req, res) => {
  try {
    if (req.user.role !== 'CR') {
      return res.status(403).json({ message: 'Only CRs can log faculty entry' });
    }

    const { classroomId, periodNo } = req.body;

    if (!classroomId || !periodNo) {
      return res.status(400).json({ message: 'Classroom ID and Period Number are required' });
    }

    const classroom = await prisma.classroom.findUnique({
      where: { id: parseInt(classroomId) },
    });

    if (!classroom) {
      return res.status(404).json({ message: 'Classroom not found' });
    }

    // Verify CR matches this classroom's class name
    if (req.user.className !== classroom.className) {
      return res.status(403).json({ message: 'You can only log attendance for your assigned classroom' });
    }
    const today = getTodayDay();
    const currentTime = getCurrentTimeInHHMM();

    const periodConfig = STANDARD_PERIODS.find(p => p.periodNo === parseInt(periodNo));
    if (!periodConfig) {
      return res.status(400).json({ message: 'Invalid period number' });
    }

    // Optional timetable lookup for metadata
    const timetableEntry = await prisma.timetable.findFirst({
      where: {
        classroomId: classroom.id,
        day: today,
        periodNo: parseInt(periodNo),
      },
    });

    const startTime = timetableEntry ? timetableEntry.startTime : periodConfig.startTime;
    const endTime = timetableEntry ? timetableEntry.endTime : periodConfig.endTime;
    const facultyName = timetableEntry ? timetableEntry.facultyName : 'Faculty';
    const subjectName = timetableEntry ? timetableEntry.subjectName : 'Class';

    // Check time constraints
    const isActive = startTime <= currentTime && currentTime < endTime;
    if (!isActive) {
      return res.status(400).json({
        message: `Time restriction violation: This period is active between ${startTime} and ${endTime}. Current time is ${currentTime}.`,
      });
    }

    // Check if log already exists for today
    const { start: startOfToday, end: endOfToday } = getLocalDayBounds();

    const existingLog = await prisma.facultyLog.findFirst({
      where: {
        classroomId: classroom.id,
        periodNo: parseInt(periodNo),
        createdAt: {
          gte: startOfToday,
          lte: endOfToday,
        },
      },
    });

    if (existingLog) {
      return res.status(400).json({ message: 'Attendance already marked for this period today' });
    }

    // Create Present log
    const log = await prisma.facultyLog.create({
      data: {
        classroomId: classroom.id,
        facultyName: facultyName,
        periodNo: parseInt(periodNo),
        entryTime: new Date(),
        status: 'Present',
      },
      include: {
        classroom: true,
      },
    });

    // Broadcast the live update via Socket.IO
    emitClassroomStatusUpdate({
      classroomId: classroom.id,
      roomNumber: classroom.roomNumber,
      className: classroom.className,
      periodNo: parseInt(periodNo),
      facultyName: facultyName,
      status: 'Present',
      subjectName: subjectName,
      startTime: startTime,
      endTime: endTime,
      entryTime: log.entryTime,
    });

    // Emit live notification
    emitNotification({
      message: `${facultyName} entered Room ${classroom.roomNumber} (${classroom.className})`,
      type: 'success', // success notification
      classroomName: classroom.className,
      roomNumber: classroom.roomNumber,
    });

    res.status(201).json(log);
  } catch (error) {
    console.error('Error logging entry:', error);
    res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
};

module.exports = {
  createEntryLog,
};
