const express = require('express');
const router = express.Router();
const { login, register, deleteUser, getUsers, me, updateProfile } = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');
const roleMiddleware = require('../middleware/role.middleware');

router.post('/login', login);
router.get('/me', authMiddleware, me);
router.put('/profile', authMiddleware, updateProfile);

// HOD exclusive operations
router.post('/register', authMiddleware, roleMiddleware(['HOD']), register);
router.delete('/users/:id', authMiddleware, roleMiddleware(['HOD']), deleteUser);
router.get('/users', authMiddleware, roleMiddleware(['HOD']), getUsers);

module.exports = router;
