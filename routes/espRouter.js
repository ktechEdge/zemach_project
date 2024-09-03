const express = require('express');
const router = express.Router();
const environmentalDataMiddleware = require('../models/environmental');

const router = express.Router();
const { uploadFirmware, downloadLatestFirmware, getVersion } = require('../controllers/firmwareController');
const { createEnvironmentalData } = require('../controllers/environmentalController');
const upload = require('../middleware/upload');

// Create new Esp environmental data
router.post('/', createEnvironmentalData);

// Handle firmware upload
router.post('/upload', upload.single('firmware'), uploadFirmware);

// Download the most recent firmware
router.get('/download', downloadLatestFirmware);

// Get the current version number
router.get('/version', getVersion);

module.exports = router;