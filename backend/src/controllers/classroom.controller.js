const prisma = require('../db');
const { getTodayDay, getCurrentTimeInHHMM, getLocalDayBounds } = require('../utils/date');

const getClassrooms = async (req, res) => {
  try {
    const classrooms = await prisma.classroom.findMany({
      orderBy: { className: 'asc' },
    });

    const today = getTodayDay();
    const currentTime = getCurrentTimeInHHMM();

    const { start: startOfToday, end: endOfToday } = getLocalDayBounds();

    const result = [];

    for (const classroom of classrooms) {
      // Find current active period
      const activePeriod = await prisma.timetable.findFirst({
        where: {
          classroomId: classroom.id,
          day: today,
          startTime: { lte: currentTime },
          endTime: { gt: currentTime },
        },
      });

      // Find all periods today
      const periodsToday = await prisma.timetable.findMany({
        where: {
          classroomId: classroom.id,
          day: today,
        },
        orderBy: { periodNo: 'asc' },
      });

      let status = 'No Active Period';
      let currentPeriodInfo = null;
      let log = null;

      if (activePeriod) {
        log = await prisma.facultyLog.findFirst({
          where: {
            classroomId: classroom.id,
            periodNo: activePeriod.periodNo,
            createdAt: {
              gte: startOfToday,
              lte: endOfToday,
            },
          },
        });

        if (log) {
          status = log.status; // 'Present' or 'Not Entered'
        } else {
          status = 'Pending'; // Yellow status: active period but not marked yet
        }

        currentPeriodInfo = {
          periodNo: activePeriod.periodNo,
          startTime: activePeriod.startTime,
          endTime: activePeriod.endTime,
          facultyName: activePeriod.facultyName,
          subjectName: activePeriod.subjectName,
          entryTime: log ? log.entryTime : null,
        };
      } else {
        // Fallback: check the latest completed period today
        const pastPeriods = periodsToday.filter((p) => p.endTime <= currentTime);
        if (pastPeriods.length > 0) {
          const latestPast = pastPeriods[pastPeriods.length - 1];
          const pastLog = await prisma.facultyLog.findFirst({
            where: {
              classroomId: classroom.id,
              periodNo: latestPast.periodNo,
              createdAt: {
                gte: startOfToday,
                lte: endOfToday,
              },
            },
          });
          status = pastLog ? pastLog.status : 'Not Entered';
          currentPeriodInfo = {
            periodNo: latestPast.periodNo,
            startTime: latestPast.startTime,
            endTime: latestPast.endTime,
            facultyName: latestPast.facultyName,
            subjectName: latestPast.subjectName,
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
    res.status(500).json({ message: 'Internal Server Error' });
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
    res.status(500).json({ message: 'Internal Server Error' });
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
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getClassroomDetails = async (req, res) => {
  const { id } = req.params;

  try {
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
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  getClassrooms,
  createClassroom,
  deleteClassroom,
  getClassroomDetails,
};
