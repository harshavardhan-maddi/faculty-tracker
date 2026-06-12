const prisma = require('../db');
const { emitClassroomStatusUpdate, emitNotification } = require('../services/socket.service');

const getTodayDay = () => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[new Date().getDay()];
};

const getCurrentTimeInHHMM = () => {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

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

    // Check if the requested period is the active one
    const activePeriod = await prisma.timetable.findFirst({
      where: {
        classroomId: classroom.id,
        day: today,
        periodNo: parseInt(periodNo),
      },
    });

    if (!activePeriod) {
      return res.status(400).json({ message: 'Timetable entry not found for this period' });
    }

    // Check time constraints
    const isActive = activePeriod.startTime <= currentTime && currentTime < activePeriod.endTime;
    if (!isActive) {
      return res.status(400).json({
        message: `Time restriction violation: This period is active between ${activePeriod.startTime} and ${activePeriod.endTime}. Current time is ${currentTime}.`,
      });
    }

    // Check if log already exists for today
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    const existingLog = await prisma.facultyLog.findFirst({
      where: {
        classroomId: classroom.id,
        periodNo: activePeriod.periodNo,
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
        facultyName: activePeriod.facultyName,
        periodNo: activePeriod.periodNo,
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
      periodNo: activePeriod.periodNo,
      facultyName: activePeriod.facultyName,
      status: 'Present',
      subjectName: activePeriod.subjectName,
      startTime: activePeriod.startTime,
      endTime: activePeriod.endTime,
      entryTime: log.entryTime,
    });

    // Emit live notification
    emitNotification({
      message: `${activePeriod.facultyName} entered Room ${classroom.roomNumber} (${classroom.className})`,
      type: 'success', // success notification
      classroomName: classroom.className,
      roomNumber: classroom.roomNumber,
    });

    res.status(201).json(log);
  } catch (error) {
    console.error('Error logging entry:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  createEntryLog,
};
