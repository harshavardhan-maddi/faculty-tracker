const express = require('express');
const router = express.Router();
const { getLogsReport, getDashboardStats, getAbsenteesReport, getMonthlySectionAttendanceReport } = require('../controllers/report.controller');
const authMiddleware = require('../middleware/auth.middleware');
const roleMiddleware = require('../middleware/role.middleware');

router.get('/', authMiddleware, roleMiddleware(['HOD', 'SUB_ADMIN']), getLogsReport);
router.get('/dashboard-stats', authMiddleware, roleMiddleware(['HOD', 'SUB_ADMIN']), getDashboardStats);
router.get('/absentees', authMiddleware, roleMiddleware(['HOD', 'SUB_ADMIN', 'ABSENT_CONTROLLER']), getAbsenteesReport);
router.get('/monthly-section-attendance', authMiddleware, roleMiddleware(['HOD', 'SUB_ADMIN', 'ABSENT_CONTROLLER', 'CR']), getMonthlySectionAttendanceReport);

module.exports = router;

