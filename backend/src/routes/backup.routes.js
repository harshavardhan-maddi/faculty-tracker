const express = require('express');
const router = express.Router();
const multer = require('multer');
const authMiddleware = require('../middleware/auth.middleware');
const roleMiddleware = require('../middleware/role.middleware');
const {
  exportOverallData,
  validateBackupZip,
  executeImportToMySQL,
  generateMySQLDump,
  getMigrationHistory
} = require('../services/backup.service');

// Configure secure in-memory Multer for ZIP file handling
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB maximum archive size
  },
  fileFilter: (req, file, cb) => {
    const isZipName = file.originalname.toLowerCase().endsWith('.zip');
    const isZipMime = [
      'application/zip',
      'application/x-zip-compressed',
      'multipart/x-zip',
      'application/octet-stream'
    ].includes(file.mimetype);

    if (isZipName || isZipMime) {
      cb(null, true);
    } else {
      cb(new Error('Only valid .zip backup archives are accepted.'));
    }
  }
});

// All backup and migration routes are strictly restricted to HOD (Administrator)
router.use(authMiddleware);
router.use(roleMiddleware(['HOD']));

/**
 * GET /api/backup/export
 * Download overall database backup as attendance-system-backup-YYYY-MM-DD.zip
 */
router.get('/export', async (req, res) => {
  try {
    const result = await exportOverallData(req.user);

    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', `attachment; filename="${result.filename}"`);
    res.setHeader('Content-Length', result.buffer.length);
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');

    return res.end(result.buffer);
  } catch (error) {
    console.error('[Export Route Error]:', error);
    return res.status(500).json({
      message: 'Failed to export application data. Please try again.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

/**
 * POST /api/backup/validate
 * Validate uploaded backup ZIP, detect duplicates and broken relationships without importing
 */
router.post('/validate', upload.single('backupFile'), async (req, res) => {
  try {
    if (!req.file || !req.file.buffer) {
      return res.status(400).json({ message: 'No backup ZIP file was uploaded.' });
    }

    const validation = validateBackupZip(req.file.buffer);

    if (!validation.isValid) {
      return res.status(400).json({
        isValid: false,
        message: validation.error,
        missingFiles: validation.missingFiles
      });
    }

    // Omit full parsedData in JSON response to keep response lightweight
    const { parsedData, ...previewReport } = validation;

    return res.json({
      success: true,
      report: previewReport
    });
  } catch (error) {
    console.error('[Validate Backup Error]:', error);
    return res.status(500).json({
      message: 'Failed to validate backup archive: ' + error.message
    });
  }
});

/**
 * POST /api/backup/execute
 * Execute import of previous data into target MySQL database
 */
router.post('/execute', upload.single('backupFile'), async (req, res) => {
  try {
    if (!req.file || !req.file.buffer) {
      return res.status(400).json({ message: 'No backup ZIP file was provided for import.' });
    }

    let mysqlConfig = null;
    if (req.body && req.body.mysqlConfig) {
      try {
        mysqlConfig = typeof req.body.mysqlConfig === 'string'
          ? JSON.parse(req.body.mysqlConfig)
          : req.body.mysqlConfig;
      } catch (e) {
        mysqlConfig = null;
      }
    }

    const summary = await executeImportToMySQL(req.file.buffer, req.user, mysqlConfig);

    return res.json({
      success: summary.status === 'SUCCESS' || summary.status === 'PARTIAL_SUCCESS',
      summary: {
        status: summary.status,
        targetEngine: summary.targetEngine,
        isDirectDatabaseConnected: summary.isDirectDatabaseConnected,
        totalRecordsInBackup: summary.totalRecordsInBackup,
        recordsImported: summary.recordsImported,
        entityCounts: summary.entityCounts,
        duplicatesHandled: summary.duplicatesHandled,
        brokenRelationshipsHandled: summary.brokenRelationshipsHandled,
        errors: summary.errors
      }
    });
  } catch (error) {
    console.error('[Execute Import Error]:', error);
    return res.status(500).json({
      message: 'Failed to execute data import: ' + error.message
    });
  }
});

/**
 * POST /api/backup/generate-sql
 * Generate and download pure MySQL SQL migration dump from uploaded backup ZIP
 */
router.post('/generate-sql', upload.single('backupFile'), async (req, res) => {
  try {
    if (!req.file || !req.file.buffer) {
      return res.status(400).json({ message: 'No backup ZIP file was uploaded.' });
    }

    const validation = validateBackupZip(req.file.buffer);
    if (!validation.isValid) {
      return res.status(400).json({ message: validation.error });
    }

    const sqlDump = generateMySQLDump(validation.parsedData, validation.metadata);
    const sqlBuffer = Buffer.from(sqlDump, 'utf8');

    res.setHeader('Content-Type', 'application/sql');
    res.setHeader('Content-Disposition', 'attachment; filename="attendance-system-mysql-import.sql"');
    res.setHeader('Content-Length', sqlBuffer.length);

    return res.end(sqlBuffer);
  } catch (error) {
    console.error('[Generate SQL Error]:', error);
    return res.status(500).json({
      message: 'Failed to generate MySQL migration script: ' + error.message
    });
  }
});

/**
 * GET /api/backup/history
 * Fetch audit logs of previous exports and imports
 */
router.get('/history', async (req, res) => {
  try {
    const history = await getMigrationHistory();
    return res.json({ history });
  } catch (error) {
    console.error('[Get Backup History Error]:', error);
    return res.status(500).json({ message: 'Failed to retrieve migration history.' });
  }
});

module.exports = router;
