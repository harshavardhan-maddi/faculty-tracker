const prisma = require('../db');
const { getTodayDay, getLocalDayBounds, getWeekdayForDate } = require('../utils/date');

const getLogsReport = async (req, res) => {
  const { faculty, classroomId, date } = req.query;

  const where = {};

  if (faculty) {
    where.facultyName = faculty;
  }

  if (classroomId) {
    where.classroomId = parseInt(classroomId);
  }

  if (date) {
    const { start: startOfDay, end: endOfDay } = getLocalDayBounds(date);
    
    where.createdAt = {
      gte: startOfDay,
      lte: endOfDay,
    };
  }

  try {
    const logs = await prisma.facultyLog.findMany({
      where,
      include: {
        classroom: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const enrichedLogs = [];

    for (const log of logs) {
      // Find day name from log date to locate timetable
      const logDay = getWeekdayForDate(log.createdAt);

      const timetable = await prisma.timetable.findFirst({
        where: {
          classroomId: log.classroomId,
          periodNo: log.periodNo,
          day: logDay,
        },
      });

      enrichedLogs.push({
        id: log.id,
        createdAt: log.createdAt,
        classroom: {
          id: log.classroom.id,
          roomNumber: log.classroom.roomNumber,
          className: log.classroom.className,
        },
        facultyName: log.facultyName,
        subjectName: timetable ? timetable.subjectName : 'N/A',
        periodNo: log.periodNo,
        entryTime: log.entryTime,
        status: log.status,
        timeSlot: timetable ? `${timetable.startTime} - ${timetable.endTime}` : 'N/A',
      });
    }

    res.json(enrichedLogs);
  } catch (error) {
    console.error('Error fetching logs report:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getDashboardStats = async (req, res) => {
  try {
    const { start: startOfToday, end: endOfToday } = getLocalDayBounds();

    // Basic counts
    const classroomCount = await prisma.classroom.count();
    const facultyCount = await prisma.faculty.count();
    const crCount = await prisma.user.count({ where: { role: 'CR' } });

    // Today's logs counts
    const logsToday = await prisma.facultyLog.findMany({
      where: {
        createdAt: {
          gte: startOfToday,
          lte: endOfToday,
        },
      },
    });

    const presentCount = logsToday.filter((l) => l.status === 'Present').length;
    const absentCount = logsToday.filter((l) => l.status === 'Not Entered').length;
    const totalLogsToday = logsToday.length;

    let presencePercentage = 100;
    if (totalLogsToday > 0) {
      presencePercentage = Math.round((presentCount / totalLogsToday) * 100);
    }

    // Classroom analytics: detailed presence per class today
    const classrooms = await prisma.classroom.findMany({
      include: {
        logs: {
          where: {
            createdAt: {
              gte: startOfToday,
              lte: endOfToday,
            },
          },
        },
      },
    });

    const classroomAnalytics = classrooms.map((c) => {
      const total = c.logs.length;
      const present = c.logs.filter((l) => l.status === 'Present').length;
      return {
        className: c.className,
        roomNumber: c.roomNumber,
        totalPeriods: total,
        presentPeriods: present,
        percentage: total > 0 ? Math.round((present / total) * 100) : 100,
      };
    });

    // Recent activity feed: last 15 logs across all classrooms
    const recentLogs = await prisma.facultyLog.findMany({
      take: 15,
      orderBy: { createdAt: 'desc' },
      include: {
        classroom: true,
      },
    });

    const enrichedRecent = [];
    for (const log of recentLogs) {
      const logDay = getWeekdayForDate(log.createdAt);

      const tt = await prisma.timetable.findFirst({
        where: {
          classroomId: log.classroomId,
          periodNo: log.periodNo,
          day: logDay,
        },
      });

      enrichedRecent.push({
        id: log.id,
        createdAt: log.createdAt,
        roomNumber: log.classroom.roomNumber,
        className: log.classroom.className,
        facultyName: log.facultyName,
        subjectName: tt ? tt.subjectName : 'N/A',
        periodNo: log.periodNo,
        entryTime: log.entryTime,
        status: log.status,
      });
    }

    res.json({
      stats: {
        classrooms: classroomCount,
        faculties: facultyCount,
        crs: crCount,
        presentToday: presentCount,
        absentToday: absentCount,
        presencePercentage,
      },
      classroomAnalytics,
      recentActivity: enrichedRecent,
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  getLogsReport,
  getDashboardStats,
};
