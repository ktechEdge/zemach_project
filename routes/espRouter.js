const express = require('express');
const router = express.Router();
const environmentalService = require('../models/esp_M');

// Ensure the uploads directory exists on server start
environmentalService.ensureUploadsDirExists();

// יצירת נתונים סביבתיים חדשים
router.post('/', environmentalService.createEnvironmentalData);

// העלאת קובץ
router.post('/upload', environmentalService.uploadFirmware);

// הורדת קובץ אחרון
router.get('/download', environmentalService.downloadLatestFirmware);

// קבלת מספר הגרסה הנוכחית
router.get('/version', environmentalService.getCurrentVersion);

module.exports = router;
