const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Path to the uploads folder inside zemach_project
const uploadDir = path.join(__dirname, '../uploads');
const versionFilePath = path.join(__dirname, '../version.txt');

// Ensure the uploads directory exists
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log(`Created directory: ${uploadDir}`);
} else {
    console.log(`Directory already exists: ${uploadDir}`);
}

// Initialize version file if it doesn't exist
if (!fs.existsSync(versionFilePath)) {
    fs.writeFileSync(versionFilePath, '1.0.0');
    console.log(`Created version file: ${versionFilePath}`);
}

// Function to read and update version
const getNextVersion = () => {
    let currentVersion = fs.readFileSync(versionFilePath, 'utf8').trim();
    let versionParts = currentVersion.split('.').map(Number);

    // Increment the patch number
    versionParts[2] += 1;

    // Join version parts back together
    const newVersion = versionParts.join('.');

    // Update the version file
    fs.writeFileSync(versionFilePath, newVersion);
    console.log(`Updated version to: ${newVersion}`);

    return newVersion;
};

// Define storage location and filename handling
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Use the dynamically created directory
        console.log(`Storing file in directory: ${uploadDir}`);
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        // Get the next version number
        const versionNumber = getNextVersion();

        // Create a unique filename including the version number
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const filename = `firmware_v${versionNumber}-${uniqueSuffix}${path.extname(file.originalname)}`;

        console.log(`Generated filename: ${filename}`);
        cb(null, filename);
    }
});

const upload = multer({ storage: storage });

// Endpoint to handle file upload
router.post('/', upload.single('firmware'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }

        console.log('File uploaded successfully:', req.file);

        res.status(200).send('Firmware uploaded successfully.');
    } catch (error) {
        console.error('Error while uploading file:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
