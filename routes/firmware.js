const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Path to the uploads folder inside zemach_project
const uploadDir = path.join(__dirname, '../zemach_project/uploads');

// Create the uploads directory if it doesn't exist
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Define storage location and filename handling
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir); // Use the dynamically created directory
    },
    filename: function (req, file, cb) {
        // Get version number from the request body
        const versionNumber = req.body.version || 'unknown';

        // Create a unique filename including the version number
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const filename = `firmware_v${versionNumber}-${uniqueSuffix}${path.extname(file.originalname)}`;

        cb(null, filename);
    }
});

const upload = multer({ storage: storage });

// קצה לקבלת קובץ bin
router.post('/', upload.single('firmware'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }

        console.log('File uploaded successfully:', req.file);

        // Logic to process the file or update the system

        res.status(200).send('Firmware uploaded successfully.');
    } catch (error) {
        console.error('Error while uploading file:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
