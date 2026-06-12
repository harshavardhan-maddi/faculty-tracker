const express = require('express');
const router = express.Router();
const { createEntryLog } = require('../controllers/log.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.post('/', authMiddleware, createEntryLog);

module.exports = router;
