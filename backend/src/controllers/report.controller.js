const prisma = require('../db');
const { getTodayDay, getLocalDayBounds, getWeekdayForDate, STANDARD_PERIODS } = require('../utils/date');

const getLogsReport = async (req, res) => {
  const { classroomId, date, startDate, endDate } = req.query;

  const where = {};

  if (classroomId) {
    where.classroomId = parseInt(classroomId);
  }

  if (date) {
    const { start: startOfDay, end: endOfDay } = getLocalDayBounds(date);
    
    where.createdAt = {
      gte: startOfDay,
      lte: endOfDay,
    };
  } else if (startDate && endDate) {
    const { start: startOfRange } = getLocalDayBounds(startDate);
    const { end: endOfRange } = getLocalDayBounds(endDate);

    where.createdAt = {
      gte: startOfRange,
      lte: endOfRange,
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

      const periodConfig = STANDARD_PERIODS.find(p => p.periodNo === log.periodNo);
      const timeSlot = timetable 
        ? `${timetable.startTime} - ${timetable.endTime}` 
        : (periodConfig ? `${periodConfig.startTime} - ${periodConfig.endTime}` : 'N/A');
      const subjectName = timetable ? timetable.subjectName : 'Class';

      enrichedLogs.push({
        id: log.id,
        createdAt: log.createdAt,
        classroom: {
          id: log.classroom.id,
          roomNumber: log.classroom.roomNumber,
          className: log.classroom.className,
        },
        facultyName: log.facultyName,
        subjectName: subjectName,
        periodNo: log.periodNo,
        entryTime: log.entryTime,
        status: log.status,
        timeSlot: timeSlot,
      });
    }

    res.json(enrichedLogs);
  } catch (error) {
    console.error('Error fetching logs report:', error);
    res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
};

const getDashboardStats = async (req, res) => {
  try {
    const { start: startOfToday, end: endOfToday } = getLocalDayBounds();

    // Basic counts
    const classroomCount = await prisma.classroom.count();
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
    res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
};

const getAbsenteesReport = async (req, res) => {
  const { section, date, startDate, endDate } = req.query;

  const whereClause = {
    status: { in: ['Absent', 'Late'] }
  };

  // String-based Date filter (date and date range are YYYY-MM-DD formatted strings in the DB)
  if (date) {
    whereClause.date = date;
  } else if (startDate && endDate) {
    whereClause.date = {
      gte: startDate,
      lte: endDate
    };
  }

  // Section filter
  if (section && section !== 'All') {
    whereClause.student = {
      section: section
    };
  }

  try {
    const attendances = await prisma.attendance.findMany({
      where: whereClause,
      include: {
        student: true
      },
      orderBy: [
        { date: 'desc' },
        { student: { rollNumber: 'asc' } }
      ]
    });

    // Build call logs where condition
    const callLogWhere = {};
    if (date) {
      callLogWhere.date = date;
    } else if (startDate && endDate) {
      callLogWhere.date = {
        gte: startDate,
        lte: endDate
      };
    }

    const callLogs = await prisma.absenteeCallLog.findMany({
      where: callLogWhere
    });

    // Map call logs for fast O(1) lookup
    const callLogMap = {};
    callLogs.forEach(cl => {
      callLogMap[`${cl.studentId}_${cl.date}`] = cl;
    });

    // Map user names for fast O(1) lookup of calledById
    const users = await prisma.user.findMany({
      select: { id: true, name: true }
    });
    const userMap = {};
    users.forEach(u => {
      userMap[u.id] = u.name;
    });

    const reportData = attendances.map(att => {
      const s = att.student;
      const callLog = callLogMap[`${att.studentId}_${att.date}`];

      return {
        id: att.id,
        date: att.date,
        rollNumber: s.rollNumber,
        name: s.name,
        section: s.section,
        status: att.status,
        studentMobile: s.studentMobile,
        parentMobile: s.parentMobile,
        called: !!callLog,
        answered: callLog ? callLog.answered : null,
        reason: callLog ? (callLog.reason || '') : null,
        calledBy: callLog ? (userMap[callLog.calledById] || 'Unknown') : null,
        calledAt: callLog ? callLog.createdAt : null
      };
    });

    res.json(reportData);
  } catch (error) {
    console.error('Error fetching absentees report:', error);
    res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
};

module.exports = {
  getLogsReport,
  getDashboardStats,
  getAbsenteesReport,
};

