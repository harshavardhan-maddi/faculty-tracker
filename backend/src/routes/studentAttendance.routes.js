const express = require('express');
const router = express.Router();
const prisma = require('../db');
const authMiddleware = require('../middleware/auth.middleware');
const roleMiddleware = require('../middleware/role.middleware');
const { getTodayDay } = require('../utils/date');

const getTimingSettings = async () => {
  const defaults = {
    morningStart: "09:10",
    morningEnd: "09:50",
    afternoonStart: "13:30",
    afternoonEnd: "14:10"
  };

  try {
    const settings = await prisma.systemSetting.findMany({
      where: {
        key: {
          in: [
            'morning_start_time',
            'morning_end_time',
            'afternoon_start_time',
            'afternoon_end_time'
          ]
        }
      }
    });

    const timingMap = {};
    settings.forEach(s => {
      timingMap[s.key] = s.value;
    });

    return {
      morningStart: timingMap['morning_start_time'] || defaults.morningStart,
      morningEnd: timingMap['morning_end_time'] || defaults.morningEnd,
      afternoonStart: timingMap['afternoon_start_time'] || defaults.afternoonStart,
      afternoonEnd: timingMap['afternoon_end_time'] || defaults.afternoonEnd
    };
  } catch (error) {
    console.error('Error fetching timing settings:', error);
    return defaults;
  }
};

const checkCRAttendanceAccess = async (user, className) => {
  if (user.role !== 'CR') return true;

  // Sunday or holiday check
  const todayDay = getTodayDay();
  const isSunday = todayDay === 'Sunday';
  const trackingSetting = await prisma.systemSetting.findUnique({
    where: { key: 'trackingEnabled' },
  });
  const trackingEnabled = isSunday ? false : (trackingSetting ? trackingSetting.value === 'true' : true);

  if (!trackingEnabled) {
    return false;
  }

  const now = new Date();
  const kolkataTimeString = now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
  const kolkataDate = new Date(kolkataTimeString);
  
  const hours = kolkataDate.getHours();
  const minutes = kolkataDate.getMinutes();
  const currentMinutes = hours * 60 + minutes;

  const timings = await getTimingSettings();
  const [msH, msM] = timings.morningStart.split(':').map(Number);
  const [meH, meM] = timings.morningEnd.split(':').map(Number);
  const [asH, asM] = timings.afternoonStart.split(':').map(Number);
  const [aeH, aeM] = timings.afternoonEnd.split(':').map(Number);
  
  const morningStart = msH * 60 + msM;
  const morningEnd = meH * 60 + meM;
  const afternoonStart = asH * 60 + asM;
  const afternoonEnd = aeH * 60 + aeM;
  
  const inWindow = (currentMinutes >= morningStart && currentMinutes < morningEnd) ||
                   (currentMinutes >= afternoonStart && currentMinutes < afternoonEnd);
  
  if (inWindow) return true;

  const todayKolkata = new Date().toLocaleDateString("en-US", { timeZone: "Asia/Kolkata" });
  const [m, d, y] = todayKolkata.split('/');
  const todayDateStr = `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;

  const overrideKey = `override_attendance_date_${className}`;
  const overrideSetting = await prisma.systemSetting.findUnique({
    where: { key: overrideKey }
  });

  if (overrideSetting && overrideSetting.value === todayDateStr) {
    return true;
  }

  return false;
};

router.get('/can-submit', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'CR') {
      return res.json({ canSubmit: true });
    }
    
    const className = req.user.className;
    if (!className) {
      return res.json({ canSubmit: false, reason: 'No class assigned' });
    }

    const todayDay = getTodayDay();
    const isSunday = todayDay === 'Sunday';
    const trackingSetting = await prisma.systemSetting.findUnique({
      where: { key: 'trackingEnabled' },
    });
    const trackingEnabled = isSunday ? false : (trackingSetting ? trackingSetting.value === 'true' : true);

    if (!trackingEnabled) {
      return res.json({ 
        canSubmit: false, 
        reason: isSunday 
          ? 'Today is Sunday. College is on Holiday.' 
          : 'Attendance submissions are disabled. College is on Holiday.'
      });
    }

    const hasAccess = await checkCRAttendanceAccess(req.user, className);
    if (hasAccess) {
      return res.json({ canSubmit: true });
    }

    const timings = await getTimingSettings();
    res.json({ 
      canSubmit: false, 
      reason: `Attendance window closed. Morning window: ${timings.morningStart} - ${timings.morningEnd}, Afternoon window: ${timings.afternoonStart} - ${timings.afternoonEnd}. Contact HOD/Absent Controller to request access.` 
    });
  } catch (error) {
    console.error('Error in can-submit check:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Settings endpoints for timing configuration
router.get('/settings/timings', authMiddleware, roleMiddleware(['HOD']), async (req, res) => {
  try {
    const timings = await getTimingSettings();
    res.json(timings);
  } catch (error) {
    console.error('Error getting settings:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/settings/timings', authMiddleware, roleMiddleware(['HOD']), async (req, res) => {
  const { morningStart, morningEnd, afternoonStart, afternoonEnd } = req.body;
  if (!morningStart || !morningEnd || !afternoonStart || !afternoonEnd) {
    return res.status(400).json({ message: 'All timing fields are required' });
  }

  try {
    const settings = [
      { key: 'morning_start_time', value: morningStart },
      { key: 'morning_end_time', value: morningEnd },
      { key: 'afternoon_start_time', value: afternoonStart },
      { key: 'afternoon_end_time', value: afternoonEnd },
    ];

    for (const setting of settings) {
      await prisma.systemSetting.upsert({
        where: { key: setting.key },
        update: { value: setting.value },
        create: { key: setting.key, value: setting.value }
      });
    }

    res.json({ message: 'Timings updated successfully' });
  } catch (error) {
    console.error('Error updating settings:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// 1. POST /students - HOD/Sub-Admin registers a student
router.post('/students', authMiddleware, roleMiddleware(['HOD', 'SUB_ADMIN']), async (req, res) => {
  const { rollNumber, name, section, studentMobile, parentMobile } = req.body;
  if (!rollNumber || !name || !section || !studentMobile || !parentMobile) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const existing = await prisma.student.findUnique({
      where: { rollNumber }
    });
    if (existing) {
      return res.status(400).json({ message: 'Student with this roll number already exists' });
    }

    const student = await prisma.student.create({
      data: {
        rollNumber,
        name,
        section,
        studentMobile,
        parentMobile
      }
    });

    res.status(201).json(student);
  } catch (error) {
    console.error('Create student error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// 2. GET /students - Fetch students in section (filtered for CRs)
router.get('/students', authMiddleware, async (req, res) => {
  const { section } = req.query;
  const user = req.user;

  try {
    if (user.role === 'CR') {
      const classFilter = user.className;
      if (!classFilter) {
        return res.status(400).json({ message: 'CR is not assigned to any class' });
      }

      const students = await prisma.student.findMany({
        where: { section: classFilter },
        orderBy: { rollNumber: 'asc' }
      });

      // Mask/exclude mobile numbers for CR
      const sanitized = students.map(s => ({
        id: s.id,
        rollNumber: s.rollNumber,
        name: s.name,
        section: s.section,
        createdAt: s.createdAt
      }));

      return res.json(sanitized);
    }

    // For HOD, SUB_ADMIN, and ABSENT_CONTROLLER
    const where = {};
    if (section && section !== 'All') {
      where.section = section;
    }

    const students = await prisma.student.findMany({
      where,
      orderBy: { rollNumber: 'asc' }
    });

    res.json(students);
  } catch (error) {
    console.error('Fetch students error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// 3. POST /bulk - Bulk hit student attendance
router.post('/bulk', authMiddleware, roleMiddleware(['CR', 'HOD', 'SUB_ADMIN', 'FACULTY']), async (req, res) => {
  const { section, date, attendanceData } = req.body;
  if (!section || !date || !Array.isArray(attendanceData)) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // If user is CR, verify they are hitting attendance for their own section
    if (req.user.role === 'CR' && req.user.className !== section) {
      return res.status(403).json({ message: 'Forbidden: CR can only hit attendance for their own section' });
    }

    const hasAccess = await checkCRAttendanceAccess(req.user, section);
    if (!hasAccess) {
      const timings = await getTimingSettings();
      return res.status(403).json({ 
        message: `Attendance window is closed. Morning: ${timings.morningStart}-${timings.morningEnd}, Afternoon: ${timings.afternoonStart}-${timings.afternoonEnd}. Contact HOD/Absent Controller to request access.` 
      });
    }

    for (const record of attendanceData) {
      await prisma.attendance.upsert({
        where: {
          studentId_date: {
            studentId: record.studentId,
            date: date
          }
        },
        update: {
          status: record.status,
          markedBy: req.user.id,
          isLateComer: record.status === 'Late'
        },
        create: {
          studentId: record.studentId,
          date: date,
          status: record.status,
          markedBy: req.user.id,
          isLateComer: record.status === 'Late'
        }
      });
    }

    res.json({ message: 'Attendance updated successfully' });
  } catch (error) {
    console.error('Bulk attendance error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// 4. POST /late-comer - CR marks/updates student as late comer
router.post('/late-comer', authMiddleware, roleMiddleware(['CR', 'HOD', 'SUB_ADMIN']), async (req, res) => {
  const { studentId, date } = req.body;
  if (!studentId || !date) {
    return res.status(400).json({ message: 'Missing studentId or date' });
  }

  try {
    const student = await prisma.student.findUnique({
      where: { id: Number(studentId) }
    });

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Verify CR permissions
    if (req.user.role === 'CR' && req.user.className !== student.section) {
      return res.status(403).json({ message: 'Forbidden: CR can only modify students in their own section' });
    }

    const hasAccess = await checkCRAttendanceAccess(req.user, student.section);
    if (!hasAccess) {
      const timings = await getTimingSettings();
      return res.status(403).json({ 
        message: `Attendance window is closed. Morning: ${timings.morningStart}-${timings.morningEnd}, Afternoon: ${timings.afternoonStart}-${timings.afternoonEnd}. Contact HOD/Absent Controller to request access.` 
      });
    }

    const attendance = await prisma.attendance.upsert({
      where: {
        studentId_date: {
          studentId: student.id,
          date: date
        }
      },
      update: {
        status: 'Late',
        markedBy: req.user.id,
        isLateComer: true
      },
      create: {
        studentId: student.id,
        date: date,
        status: 'Late',
        markedBy: req.user.id,
        isLateComer: true
      }
    });

    res.json({ message: 'Student marked as Late successfully', attendance });
  } catch (error) {
    console.error('Late comer attendance error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// 5. GET /absentees - List of absentees for a given section & date
router.get('/absentees', authMiddleware, async (req, res) => {
  const { section, date } = req.query;
  const user = req.user;

  if (!section || !date) {
    return res.status(400).json({ message: 'Missing section or date parameters' });
  }

  try {
    // If CR, enforce section restriction
    if (user.role === 'CR' && user.className !== section) {
      return res.status(403).json({ message: 'Forbidden: CR can only view their own section' });
    }

    const whereClause = {
      date: date,
      status: { in: ['Absent', 'Late'] }
    };
    if (section !== 'All') {
      whereClause.student = { section: section };
    }

    const absentees = await prisma.attendance.findMany({
      where: whereClause,
      include: {
        student: true
      }
    });

    let callLogs = [];
    let callerMap = {};
    if (user.role !== 'CR') {
      callLogs = await prisma.absenteeCallLog.findMany({
        where: { date: date },
        orderBy: { createdAt: 'desc' }
      });
      const callerIds = [...new Set(callLogs.map(cl => cl.calledById))];
      const callers = await prisma.user.findMany({
        where: { id: { in: callerIds } },
        select: { id: true, name: true, role: true }
      });
      callers.forEach(c => {
        callerMap[c.id] = { name: c.name, role: c.role };
      });
    }

    const formatted = absentees.map(att => {
      const s = att.student;
      const matchingCallLog = callLogs.find(cl => cl.studentId === s.id);
      
      const dateObj = new Date(att.updatedAt);
      const kolkataTimeString = dateObj.toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
      const kolkataDate = new Date(kolkataTimeString);
      const hour = kolkataDate.getHours();
      const attendanceSession = hour >= 12 ? 'afternoon' : 'morning';

      const resObj = {
        id: s.id,
        rollNumber: s.rollNumber,
        name: s.name,
        section: s.section,
        status: att.status,
        isLateComer: att.isLateComer,
        attendanceSession
      };

      if (user.role !== 'CR') {
        resObj.studentMobile = s.studentMobile;
        resObj.parentMobile = s.parentMobile;
        resObj.preExcusedStart = s.preExcusedStart;
        resObj.preExcusedEnd = s.preExcusedEnd;
        resObj.preExcusedReason = s.preExcusedReason;

        // Check if student is pre-excused for the queried date
        const queryDateStr = date; // Format: "YYYY-MM-DD"
        const isPreExcused = s.preExcusedStart && s.preExcusedEnd && 
                             queryDateStr >= s.preExcusedStart && queryDateStr <= s.preExcusedEnd;

        if (isPreExcused) {
          resObj.callLog = {
            id: matchingCallLog ? matchingCallLog.id : -1,
            answered: true,
            reason: `Pre-informed Absent: ${s.preExcusedReason || 'No reason specified'} (${s.preExcusedStart} to ${s.preExcusedEnd})`,
            isPreExcused: true
          };
        } else {
          resObj.callLog = matchingCallLog ? {
            id: matchingCallLog.id,
            answered: matchingCallLog.answered,
            reason: matchingCallLog.reason,
            createdAt: matchingCallLog.createdAt,
            caller: callerMap[matchingCallLog.calledById] || null
          } : null;
        }
      }

      return resObj;
    });

    res.json(formatted);
  } catch (error) {
    console.error('Fetch absentees error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// 6. POST /call-log - Absent Controller records call stats
router.post('/call-log', authMiddleware, roleMiddleware(['ABSENT_CONTROLLER', 'HOD', 'SUB_ADMIN', 'FACULTY']), async (req, res) => {
  const { studentId, date, answered, reason, callType, recipient, preExcusedStart, preExcusedEnd, preExcusedReason } = req.body;
  if (!studentId || !date || answered === undefined) {
    return res.status(400).json({ message: 'Missing studentId, date, or answered status' });
  }

  try {
    // Preserving all historical logs. No deletion of past logs for the same day.

    const callLog = await prisma.absenteeCallLog.create({
      data: {
        studentId: Number(studentId),
        date: date,
        answered: Boolean(answered),
        reason: answered ? (reason || '') : null,
        calledById: req.user.id,
        callType: callType || 'ABSENT',
        recipient: recipient || 'PARENT'
      }
    });

    // 2. Update Student's pre-excused schedule if parent answered and provided date range
    if (answered && preExcusedStart && preExcusedEnd) {
      await prisma.student.update({
        where: { id: Number(studentId) },
        data: {
          preExcusedStart,
          preExcusedEnd,
          preExcusedReason: preExcusedReason || reason || ''
        }
      });
    } else if (!answered || (!preExcusedStart && !preExcusedEnd)) {
      // Clear pre-excused dates if they are cleared or parent didn't answer
      await prisma.student.update({
        where: { id: Number(studentId) },
        data: {
          preExcusedStart: null,
          preExcusedEnd: null,
          preExcusedReason: null
        }
      });
    }

    res.status(201).json(callLog);
  } catch (error) {
    console.error('Create call-log error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// 7. GET /student/:studentId/absent-days - History of absent dates for a student
router.get('/student/:studentId/absent-days', authMiddleware, async (req, res) => {
  const { studentId } = req.params;

  try {
    const absences = await prisma.attendance.findMany({
      where: {
        studentId: Number(studentId),
        status: 'Absent'
      },
      orderBy: { date: 'desc' }
    });

    res.json(absences.map(a => ({
      id: a.id,
      date: a.date,
      status: a.status
    })));
  } catch (error) {
    console.error('Fetch absent days error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// 7b. GET /student/:studentId/call-history - Fetch all call logs/remarks for a student
router.get('/student/:studentId/call-history', authMiddleware, async (req, res) => {
  const { studentId } = req.params;

  try {
    const logs = await prisma.absenteeCallLog.findMany({
      where: {
        studentId: Number(studentId)
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Fetch user details for calledByIds
    const calledByIds = [...new Set(logs.map(log => log.calledById))];
    const users = await prisma.user.findMany({
      where: {
        id: { in: calledByIds }
      },
      select: {
        id: true,
        name: true
      }
    });

    const userMap = {};
    users.forEach(u => {
      userMap[u.id] = u.name;
    });

    const formattedLogs = logs.map(log => ({
      id: log.id,
      date: log.date,
      answered: log.answered,
      reason: log.reason,
      createdAt: log.createdAt,
      calledBy: userMap[log.calledById] || 'Unknown User',
      callType: log.callType,
      recipient: log.recipient
    }));

    res.json(formattedLogs);
  } catch (error) {
    console.error('Fetch student call history error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// 8. DELETE /students/:id - HOD/Sub-Admin deletes a student profile
router.delete('/students/:id', authMiddleware, roleMiddleware(['HOD', 'SUB_ADMIN']), async (req, res) => {
  const { id } = req.params;

  try {
    const student = await prisma.student.findUnique({
      where: { id: Number(id) }
    });

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    await prisma.student.delete({
      where: { id: Number(id) }
    });

    res.json({ message: `Student ${student.name} deleted successfully` });
  } catch (error) {
    console.error('Delete student error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// 8b. POST /students/bulk-delete - HOD deletes multiple students or a whole section
router.post('/students/bulk-delete', authMiddleware, roleMiddleware(['HOD']), async (req, res) => {
  const { studentIds, section } = req.body;

  if (!studentIds && !section) {
    return res.status(400).json({ message: 'Please specify studentIds or section to delete' });
  }

  try {
    let deletedCount = 0;
    if (studentIds && Array.isArray(studentIds) && studentIds.length > 0) {
      const deleteResult = await prisma.student.deleteMany({
        where: { id: { in: studentIds.map(Number) } }
      });
      deletedCount = deleteResult.count;
    } else if (section) {
      const deleteResult = await prisma.student.deleteMany({
        where: { section: section }
      });
      deletedCount = deleteResult.count;
    }

    res.json({ message: `Successfully deleted ${deletedCount} students.` });
  } catch (error) {
    console.error('Bulk delete students error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// 9. POST /students/bulk - HOD/Sub-Admin bulk registers students from CSV/JSON parsed array
router.post('/students/bulk', authMiddleware, roleMiddleware(['HOD', 'SUB_ADMIN']), async (req, res) => {
  const { section, students } = req.body;
  if (!section || !Array.isArray(students)) {
    return res.status(400).json({ message: 'Missing section or students array' });
  }

  try {
    const results = [];
    for (const s of students) {
      if (!s.rollNumber || !s.name || !s.studentMobile || !s.parentMobile) {
        continue; // skip incomplete records
      }

      const student = await prisma.student.upsert({
        where: { rollNumber: s.rollNumber },
        update: {
          name: s.name,
          section: section,
          studentMobile: s.studentMobile,
          parentMobile: s.parentMobile
        },
        create: {
          rollNumber: s.rollNumber,
          name: s.name,
          section: section,
          studentMobile: s.studentMobile,
          parentMobile: s.parentMobile
        }
      });
      results.push(student);
    }

    res.json({ message: `Successfully loaded/updated ${results.length} students in section ${section}` });
  } catch (error) {
    console.error('Bulk student import error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// 10. PUT /students/:id - HOD/Sub-Admin updates student details
router.put('/students/:id', authMiddleware, roleMiddleware(['HOD', 'SUB_ADMIN']), async (req, res) => {
  const { id } = req.params;
  const { name, rollNumber, section, studentMobile, parentMobile } = req.body;

  try {
    const student = await prisma.student.findUnique({
      where: { id: Number(id) }
    });

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    if (rollNumber && rollNumber !== student.rollNumber) {
      const existing = await prisma.student.findUnique({
        where: { rollNumber }
      });
      if (existing) {
        return res.status(400).json({ message: 'Student with this roll number already exists' });
      }
    }

    const updatedStudent = await prisma.student.update({
      where: { id: Number(id) },
      data: {
        name: name !== undefined ? name : student.name,
        rollNumber: rollNumber !== undefined ? rollNumber : student.rollNumber,
        section: section !== undefined ? section : student.section,
        studentMobile: studentMobile !== undefined ? studentMobile : student.studentMobile,
        parentMobile: parentMobile !== undefined ? parentMobile : student.parentMobile,
      }
    });

    res.json(updatedStudent);
  } catch (error) {
    console.error('Update student error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;

