const express = require('express');
const router = express.Router();
const { 
  getTrackingStatus, 
  updateTrackingStatus, 
  clearLogsHistory,
  getCROverrides,
  toggleCROverride
} = require('../controllers/setting.controller');
const authMiddleware = require('../middleware/auth.middleware');
const roleMiddleware = require('../middleware/role.middleware');

router.get('/tracking', authMiddleware, getTrackingStatus);
router.put('/tracking', authMiddleware, roleMiddleware(['HOD', 'SUB_ADMIN']), updateTrackingStatus);
router.post('/clear-history', authMiddleware, roleMiddleware(['HOD', 'SUB_ADMIN']), clearLogsHistory);

router.get('/cr-overrides', authMiddleware, roleMiddleware(['HOD', 'SUB_ADMIN', 'ABSENT_CONTROLLER']), getCROverrides);
router.post('/cr-overrides/toggle', authMiddleware, roleMiddleware(['HOD', 'SUB_ADMIN', 'ABSENT_CONTROLLER']), toggleCROverride);

module.exports = router;
