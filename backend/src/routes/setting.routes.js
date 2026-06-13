const express = require('express');
const router = express.Router();
const { getTrackingStatus, updateTrackingStatus, clearLogsHistory } = require('../controllers/setting.controller');
const authMiddleware = require('../middleware/auth.middleware');
const roleMiddleware = require('../middleware/role.middleware');

router.get('/tracking', authMiddleware, getTrackingStatus);
router.put('/tracking', authMiddleware, roleMiddleware(['HOD', 'SUB_ADMIN']), updateTrackingStatus);
router.post('/clear-history', authMiddleware, roleMiddleware(['HOD', 'SUB_ADMIN']), clearLogsHistory);

module.exports = router;
