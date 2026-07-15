const express = require('express');
const router = express.Router();
const prisma = require('../db');
const authMiddleware = require('../middleware/auth.middleware');
const roleMiddleware = require('../middleware/role.middleware');

const checkCRAttendanceAccess = async (user, className) => {
  if (user.role !== 'CR') return true;

  const now = new Date();
  const kolkataTimeString = now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
  const kolkataDate = new Date(kolkataTimeString);
  
  const hours = kolkataDate.getHours();
  const minutes = kolkataDate.getMinutes();
  const currentMinutes = hours * 60 + minutes;
  
  const morningStart = 9 * 60 + 10;
  const morningEnd = 9 * 60 + 50;
  const afternoonStart = 13 * 60 + 30;
  const afternoonEnd = 14 * 60 + 10;
  
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

    const hasAccess = await checkCRAttendanceAccess(req.user, className);
    if (hasAccess) {
      return res.json({ canSubmit: true });
    }

    res.json({ 
      canSubmit: false, 
      reason: 'Attendance window closed. Morning window: 9:10 AM - 9:50 AM, Afternoon window: 1:30 PM - 2:10 PM. Contact HOD/Absent Controller to request access.' 
    });
  } catch (error) {
    console.error('Error in can-submit check:', error);
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
router.post('/bulk', authMiddleware, roleMiddleware(['CR', 'HOD', 'SUB_ADMIN']), async (req, res) => {
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
      return res.status(403).json({ message: 'Attendance window is closed. Contact HOD/Absent Controller to request access.' });
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
      return res.status(403).json({ message: 'Attendance window is closed. Contact HOD/Absent Controller to request access.' });
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
    if (user.role !== 'CR') {
      callLogs = await prisma.absenteeCallLog.findMany({
        where: { date: date }
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
            createdAt: matchingCallLog.createdAt
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
router.post('/call-log', authMiddleware, roleMiddleware(['ABSENT_CONTROLLER', 'HOD', 'SUB_ADMIN']), async (req, res) => {
  const { studentId, date, answered, reason, preExcusedStart, preExcusedEnd, preExcusedReason } = req.body;
  if (!studentId || !date || answered === undefined) {
    return res.status(400).json({ message: 'Missing studentId, date, or answered status' });
  }

  try {
    // 1. Delete and re-create Call Log
    await prisma.absenteeCallLog.deleteMany({
      where: {
        studentId: Number(studentId),
        date: date
      }
    });

    const callLog = await prisma.absenteeCallLog.create({
      data: {
        studentId: Number(studentId),
        date: date,
        answered: Boolean(answered),
        reason: answered ? (reason || '') : null,
        calledById: req.user.id
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

