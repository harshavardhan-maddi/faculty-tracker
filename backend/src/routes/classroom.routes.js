const express = require('express');
const router = express.Router();
const { getClassrooms, createClassroom, deleteClassroom, getClassroomDetails } = require('../controllers/classroom.controller');
const authMiddleware = require('../middleware/auth.middleware');
const roleMiddleware = require('../middleware/role.middleware');

router.get('/', authMiddleware, getClassrooms);
router.get('/:id', authMiddleware, getClassroomDetails);

// HOD and Sub Admin can create
router.post('/', authMiddleware, roleMiddleware(['HOD', 'SUB_ADMIN']), createClassroom);

// Only HOD can delete
router.delete('/:id', authMiddleware, roleMiddleware(['HOD']), deleteClassroom);

module.exports = router;
