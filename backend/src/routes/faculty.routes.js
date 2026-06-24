const express = require('express');
const router = express.Router();
const { getAllFaculty, upsertFaculty, bulkUpsertFaculty, deleteFaculty } = require('../controllers/faculty.controller');
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

// DELETE /api/faculty/:id
router.delete('/:id', roleMiddleware(['HOD', 'SUB_ADMIN']), deleteFaculty);

module.exports = router;
