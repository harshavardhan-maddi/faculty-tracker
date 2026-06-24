const express = require('express');
const router = express.Router();
const { getAllFaculty, upsertFaculty, bulkUpsertFaculty } = require('../controllers/faculty.controller');
const authMiddleware = require('../middleware/auth.middleware');
const roleMiddleware = require('../middleware/role.middleware');

// Apply auth middleware to all routes
router.use(authMiddleware);

// GET /api/faculty
router.get('/', roleMiddleware(['HOD', 'SUB_ADMIN']), getAllFaculty);

// POST /api/faculty
router.post('/', roleMiddleware(['HOD', 'SUB_ADMIN']), upsertFaculty);

// POST /api/faculty/bulk
router.post('/bulk', roleMiddleware(['HOD', 'SUB_ADMIN']), bulkUpsertFaculty);

module.exports = router;
