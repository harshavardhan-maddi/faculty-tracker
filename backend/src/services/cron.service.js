const cron = require('node-cron');
const prisma = require('../db');
const { emitClassroomStatusUpdate, emitNotification } = require('./socket.service');
const { getTodayDay, getCurrentTimeInHHMM, getLocalDayBounds, STANDARD_PERIODS } = require('../utils/date');
const checkExpiredPeriods = async () => {
  try {
    const today = getTodayDay();
    const currentTime = getCurrentTimeInHHMM();
    const { start: startOfToday, end: endOfToday } = getLocalDayBounds();

    // Find all expired standard periods
    const expiredStdPeriods = STANDARD_PERIODS.filter(p => p.endTime <= currentTime);
    if (expiredStdPeriods.length === 0) return;

    const classrooms = await prisma.classroom.findMany();
    const allTimetables = await prisma.timetable.findMany({
      where: {
        day: today,
      },
    });
    const allLogs = await prisma.facultyLog.findMany({
      where: {
        createdAt: {
          gte: startOfToday,
          lte: endOfToday,
        },
      },
    });

    for (const classroom of classrooms) {
      const classroomTimetables = allTimetables.filter(t => t.classroomId === classroom.id);
      const classroomLogs = allLogs.filter(l => l.classroomId === classroom.id);

      for (const period of expiredStdPeriods) {
        // Check if log already exists
        const existingLog = classroomLogs.find(l => l.periodNo === period.periodNo);

        if (!existingLog) {
          const matchingTT = classroomTimetables.find(t => t.periodNo === period.periodNo);
          const facultyName = matchingTT ? matchingTT.facultyName : 'Faculty';
          const subjectName = matchingTT ? matchingTT.subjectName : 'Class';
          const startTime = matchingTT ? matchingTT.startTime : period.startTime;
          const endTime = matchingTT ? matchingTT.endTime : period.endTime;

          const newLog = await prisma.facultyLog.create({
            data: {
              classroomId: classroom.id,
              facultyName: facultyName,
              periodNo: period.periodNo,
              entryTime: null,
              status: 'Not Entered',
              createdAt: new Date(),
            },
            include: {
              classroom: true,
            },
          });

          console.log(`[Auto-Status] Marked ${facultyName} as Not Entered in ${classroom.roomNumber} - Period ${period.periodNo}`);

          // Broadcast the update to HOD / Sub Admin
          emitClassroomStatusUpdate({
            classroomId: classroom.id,
            roomNumber: classroom.roomNumber,
            className: classroom.className,
            periodNo: period.periodNo,
            facultyName: facultyName,
            status: 'Not Entered',
            subjectName: subjectName,
            startTime: startTime,
            endTime: endTime,
            entryTime: null,
          });

          // Broadcast notifications
          emitNotification({
            message: `${facultyName} not entered into Room ${classroom.roomNumber} (${classroom.className})`,
            type: 'danger',
            classroomName: classroom.className,
            roomNumber: classroom.roomNumber,
          });
        }
      }
    }
  } catch (error) {
    console.error('Error running checkExpiredPeriods cron:', error);
  }
};


const startCron = () => {
  // Run every 60 seconds
  cron.schedule('* * * * *', () => {
    console.log('[Auto-Status Cron] Checking for expired periods...');
    checkExpiredPeriods();
  });
  console.log('[Auto-Status Cron] Service initialized.');
};

module.exports = {
  startCron,
  checkExpiredPeriods, // Export for manual triggers
};
