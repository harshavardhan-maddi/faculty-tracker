const express = require('express');
const router = express.Router();
const multer = require('multer');
const { 
  upsertTimetable, 
  getTimetableByClassroom, 
  deleteTimetable, 
  getCRSchedule, 
  getFaculties, 
  importBulkTimetable,
  analyzeTimetableFile 
} = require('../controllers/timetable.controller');
const authMiddleware = require('../middleware/auth.middleware');
const roleMiddleware = require('../middleware/role.middleware');

// Configure Multer memory storage (files are parsed in memory, not written to disk)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  }
});

router.get('/cr/schedule', authMiddleware, getCRSchedule);
router.get('/classroom/:classroomId', authMiddleware, getTimetableByClassroom);
router.get('/faculties', authMiddleware, getFaculties);

// HOD and Sub Admin can upsert, bulk import, or delete schedule periods
router.post('/', authMiddleware, roleMiddleware(['HOD', 'SUB_ADMIN']), upsertTimetable);
router.post('/bulk', authMiddleware, roleMiddleware(['HOD', 'SUB_ADMIN']), importBulkTimetable);
router.post('/upload-ai', authMiddleware, roleMiddleware(['HOD', 'SUB_ADMIN']), upload.single('file'), analyzeTimetableFile);
router.delete('/:id', authMiddleware, roleMiddleware(['HOD', 'SUB_ADMIN']), deleteTimetable);

module.exports = router;
