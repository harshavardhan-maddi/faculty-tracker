const prisma = require('../db');
const { emitClassroomStatusUpdate, emitNotification } = require('../services/socket.service');
const { getTodayDay, getCurrentTimeInHHMM, getLocalDayBounds, STANDARD_PERIODS } = require('../utils/date');

const createEntryLog = async (req, res) => {
  try {
    const trackingSetting = await prisma.systemSetting.findUnique({
      where: { key: 'trackingEnabled' },
    });
    const trackingEnabled = trackingSetting ? trackingSetting.value === 'true' : true;

    if (!trackingEnabled) {
      return res.status(403).json({ message: 'Tracking is disabled. College is on Holiday.' });
    }

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

    const startTime = periodConfig.startTime;
    const endTime = periodConfig.endTime;

    // Fetch actual timetable entry if exists
    const timetable = await prisma.timetable.findFirst({
      where: {
        classroomId: classroom.id,
        day: today,
        periodNo: parseInt(periodNo),
      },
    });

    const facultyName = timetable ? timetable.facultyName : 'Faculty';
    const subjectName = timetable ? timetable.subjectName : 'Class';

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

    // Auto-mark continuous periods of the same subject if this is the first starting period of a block
    if (timetable) {
      const timetablesToday = await prisma.timetable.findMany({
        where: {
          classroomId: classroom.id,
          day: today,
        },
        orderBy: {
          periodNo: 'asc',
        },
      });

      const currentP = parseInt(periodNo);
      const prevPeriod = timetablesToday.find(t => t.periodNo === currentP - 1);
      const isStartOfBlock = !prevPeriod || prevPeriod.subjectName !== subjectName;

      if (isStartOfBlock) {
        let nextP = currentP + 1;
        while (true) {
          const nextTimetable = timetablesToday.find(t => t.periodNo === nextP);
          if (nextTimetable && nextTimetable.subjectName === subjectName) {
            // Check if log already exists for this next period today
            const existingAutoLog = await prisma.facultyLog.findFirst({
              where: {
                classroomId: classroom.id,
                periodNo: nextP,
                createdAt: {
                  gte: startOfToday,
                  lte: endOfToday,
                },
              },
            });

            if (!existingAutoLog) {
              const autoLog = await prisma.facultyLog.create({
                data: {
                  classroomId: classroom.id,
                  facultyName: nextTimetable.facultyName,
                  periodNo: nextP,
                  entryTime: new Date(),
                  status: 'Present',
                },
              });

              // Find standard period configuration for socket event details
              const autoPeriodConfig = STANDARD_PERIODS.find(p => p.periodNo === nextP);
              const autoStartTime = autoPeriodConfig ? autoPeriodConfig.startTime : nextTimetable.startTime;
              const autoEndTime = autoPeriodConfig ? autoPeriodConfig.endTime : nextTimetable.endTime;

              // Broadcast live update for auto-marked period
              emitClassroomStatusUpdate({
                classroomId: classroom.id,
                roomNumber: classroom.roomNumber,
                className: classroom.className,
                periodNo: nextP,
                facultyName: nextTimetable.facultyName,
                status: 'Present',
                subjectName: nextTimetable.subjectName,
                startTime: autoStartTime,
                endTime: autoEndTime,
                entryTime: autoLog.entryTime,
              });

              // Emit notification for auto-marked period
              emitNotification({
                message: `${nextTimetable.facultyName} entered Room ${classroom.roomNumber} (${classroom.className})`,
                type: 'success',
                classroomName: classroom.className,
                roomNumber: classroom.roomNumber,
              });
            }
            nextP++;
          } else {
            break;
          }
        }
      }
    }

    res.status(201).json(log);
  } catch (error) {
    console.error('Error logging entry:', error);
    res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
};

module.exports = {
  createEntryLog,
};
