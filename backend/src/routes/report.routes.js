const express = require('express');
const router = express.Router();
const { getLogsReport, getDashboardStats } = require('../controllers/report.controller');
const authMiddleware = require('../middleware/auth.middleware');
const roleMiddleware = require('../middleware/role.middleware');

router.get('/', authMiddleware, roleMiddleware(['HOD', 'SUB_ADMIN']), getLogsReport);
router.get('/dashboard-stats', authMiddleware, roleMiddleware(['HOD', 'SUB_ADMIN']), getDashboardStats);

module.exports = router;
