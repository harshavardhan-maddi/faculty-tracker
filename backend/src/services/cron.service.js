const cron = require('node-cron');
const prisma = require('../db');
const { emitClassroomStatusUpdate, emitNotification } = require('./socket.service');
const { getTodayDay, getCurrentTimeInHHMM, getLocalDayBounds } = require('../utils/date');

const checkExpiredPeriods = async () => {
  try {
    const today = getTodayDay();
    const currentTime = getCurrentTimeInHHMM();

    const { start: startOfToday, end: endOfToday } = getLocalDayBounds();

    // Find all timetable periods for today that have already ended
    const expiredPeriods = await prisma.timetable.findMany({
      where: {
        day: today,
        endTime: {
          lte: currentTime,
        },
      },
      include: {
        classroom: true,
      },
    });

    for (const period of expiredPeriods) {
      // Check if a log already exists for this period today
      const existingLog = await prisma.facultyLog.findFirst({
        where: {
          classroomId: period.classroomId,
          periodNo: period.periodNo,
          createdAt: {
            gte: startOfToday,
            lte: endOfToday,
          },
        },
      });

      // If no log exists (CR didn't mark it before period end), mark as "Not Entered"
      if (!existingLog) {
        const newLog = await prisma.facultyLog.create({
          data: {
            classroomId: period.classroomId,
            facultyName: period.facultyName,
            periodNo: period.periodNo,
            entryTime: null,
            status: 'Not Entered',
            createdAt: new Date(), // Set to now (which is after period end)
          },
          include: {
            classroom: true,
          },
        });

        console.log(`[Auto-Status] Marked ${period.facultyName} as Not Entered in ${period.classroom.roomNumber} - Period ${period.periodNo}`);

        // Broadcast the update to HOD / Sub Admin
        emitClassroomStatusUpdate({
          classroomId: period.classroomId,
          roomNumber: period.classroom.roomNumber,
          className: period.classroom.className,
          periodNo: period.periodNo,
          facultyName: period.facultyName,
          status: 'Not Entered',
          subjectName: period.subjectName,
          startTime: period.startTime,
          endTime: period.endTime,
          entryTime: null,
        });

        // Broadcast notifications
        emitNotification({
          message: `${period.facultyName} not entered into Room ${period.classroom.roomNumber} (${period.classroom.className})`,
          type: 'danger', // maps to Danger style
          classroomName: period.classroom.className,
          roomNumber: period.classroom.roomNumber,
        });
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
