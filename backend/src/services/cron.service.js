const cron = require('node-cron');
const prisma = require('../db');
const { emitClassroomStatusUpdate, emitNotification } = require('./socket.service');

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

const checkExpiredPeriods = async () => {
  try {
    const today = getTodayDay();
    const currentTime = getCurrentTimeInHHMM();

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

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
