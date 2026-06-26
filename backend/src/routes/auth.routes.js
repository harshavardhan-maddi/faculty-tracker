const express = require('express');
const router = express.Router();
const { login, register, deleteUser, getUsers, me, updateProfile } = require('../controllers/auth.controller');
const {
  checkFaceStatus,
  loginWithFace,
  getFaceSettings,
  registerFace,
  updateFace,
  removeFace,
  toggleFaceAuth
} = require('../controllers/face.controller');
const authMiddleware = require('../middleware/auth.middleware');
const roleMiddleware = require('../middleware/role.middleware');

router.post('/login', login);
router.get('/me', authMiddleware, me);
router.put('/profile', authMiddleware, updateProfile);

// Face Auth operations
router.get('/face/check', checkFaceStatus);
router.post('/face/login', loginWithFace);
router.get('/face/settings', authMiddleware, getFaceSettings);
router.post('/face/register', authMiddleware, registerFace);
router.post('/face/update', authMiddleware, updateFace);
router.post('/face/remove', authMiddleware, removeFace);
router.put('/face/toggle', authMiddleware, toggleFaceAuth);

// HOD exclusive operations
router.post('/register', authMiddleware, roleMiddleware(['HOD']), register);
router.delete('/users/:id', authMiddleware, roleMiddleware(['HOD']), deleteUser);
router.get('/users', authMiddleware, roleMiddleware(['HOD']), getUsers);

module.exports = router;
