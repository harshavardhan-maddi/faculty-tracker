const express = require('express');
const router = express.Router();
const { login, register, deleteUser, getUsers, me, updateProfile } = require('../controllers/auth.controller');
const {
  checkFingerprintStatus,
  generateRegisterOptions,
  verifyRegister,
  generateLoginOptions,
  verifyLogin,
  getFingerprintSettings,
  removeFingerprint,
  toggleFingerprint,
} = require('../controllers/fingerprint.controller');
const authMiddleware = require('../middleware/auth.middleware');
const roleMiddleware = require('../middleware/role.middleware');

router.post('/login', login);
router.get('/me', authMiddleware, me);
router.put('/profile', authMiddleware, updateProfile);

// Fingerprint Auth operations
router.post('/fingerprint/check', checkFingerprintStatus);
router.post('/fingerprint/login-options', generateLoginOptions);
router.post('/fingerprint/login-verify', verifyLogin);
router.get('/fingerprint/settings', authMiddleware, roleMiddleware(['HOD', 'SUB_ADMIN']), getFingerprintSettings);
router.post('/fingerprint/register-options', authMiddleware, roleMiddleware(['HOD', 'SUB_ADMIN']), generateRegisterOptions);
router.post('/fingerprint/register-verify', authMiddleware, roleMiddleware(['HOD', 'SUB_ADMIN']), verifyRegister);
router.post('/fingerprint/remove', authMiddleware, roleMiddleware(['HOD', 'SUB_ADMIN']), removeFingerprint);
router.put('/fingerprint/toggle', authMiddleware, roleMiddleware(['HOD', 'SUB_ADMIN']), toggleFingerprint);

// HOD exclusive operations
router.post('/register', authMiddleware, roleMiddleware(['HOD']), register);
router.delete('/users/:id', authMiddleware, roleMiddleware(['HOD']), deleteUser);
router.get('/users', authMiddleware, roleMiddleware(['HOD']), getUsers);

module.exports = router;
