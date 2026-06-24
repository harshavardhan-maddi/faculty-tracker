const express = require('express');
const router = express.Router();
const { getAllFaculty, upsertFaculty, bulkUpsertFaculty } = require('../controllers/faculty.controller');
const { requireAuth, requireRole } = require('../middleware/auth.middleware');

// Apply auth middleware to all routes
router.use(requireAuth);

// GET /api/faculty
router.get('/', requireRole('HOD', 'SUB_ADMIN'), getAllFaculty);

// POST /api/faculty
router.post('/', requireRole('HOD', 'SUB_ADMIN'), upsertFaculty);

// POST /api/faculty/bulk
router.post('/bulk', requireRole('HOD', 'SUB_ADMIN'), bulkUpsertFaculty);

module.exports = router;
