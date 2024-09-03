const fs = require('fs').promises;
const path = require('path');
const multer = require('multer');
const environmentalDataMiddleware = require('../models/environmental');

// Path to the uploads folder and version file
const uploadDir = path.join(__dirname, '../uploads');
const versionFilePath = path.join(__dirname, '../version.txt');

// Ensure the uploads directory exists
const ensureUploadsDirExists = async () => {
    try {
        await fs.mkdir(uploadDir, { recursive: true });
    } catch (err) {
        if (err.code !== 'EEXIST') throw err;
    }
};

// Define storage location and filename handling
const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => {
        const versionNumber = req.body.version || 'unknown';
        const filename = `firmware_v${versionNumber}${path.extname(file.originalname)}`;
        cb(null, filename);
    }
});
const upload = multer({ storage: storageConfig });

// Create environmental data
const createEnvironmentalData = async (req, res) => {
    try {
        const id = await environmentalDataMiddleware.createData(req.body);
        res.status(201).send({ id });
    } catch (err) {
        res.status(500).send('Error creating environmental data');
    }
};

// Upload firmware file
const uploadFirmware = async (req, res) => {
    upload.single('firmware')(req, res, async (err) => {
        if (err) {
            return res.status(500).send('Error while uploading file.');
        }

        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }

        try {
            await saveVersionToFile(req.body.version);
            res.status(200).send(`Firmware uploaded successfully as version ${req.body.version}.`);
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    });
};

// Download latest firmware file
const downloadLatestFirmware = async (req, res) => {
    try {
        const latestFile = await getLatestFile();
        if (!latestFile) {
            return res.status(404).send('No files found.');
        }
        res.download(latestFile.path);
    } catch (error) {
        res.status(500).send('Error occurred while downloading the file.');
    }
};

// Get current version
const getCurrentVersion = async (req, res) => {
    try {
        const currentVersion = await getCurrentVersionFromFile();
        res.status(200).json({ version: currentVersion });
    } catch (error) {
        res.status(500).send('Error occurred while retrieving the version.');
    }
};

// Save version to file
const saveVersionToFile = async (version) => {
    await fs.writeFile(versionFilePath, version);
};

// Get current version from file
const getCurrentVersionFromFile = async () => {
    const data = await fs.readFile(versionFilePath, 'utf8');
    return data.trim();
};

// Get the latest file in the uploads directory
const getLatestFile = async () => {
    const files = await fs.readdir(uploadDir);
    if (files.length === 0) return null;

    const fileStats = await Promise.all(
        files.map(async (fileName) => {
            const filePath = path.join(uploadDir, fileName);
            const stats = await fs.stat(filePath);
            return { name: fileName, path: filePath, time: stats.mtime.getTime() };
        })
    );

    return fileStats.sort((a, b) => b.time - a.time)[0];
};

module.exports = {
    ensureUploadsDirExists,
    createEnvironmentalData,
    uploadFirmware,
    downloadLatestFirmware,
    getCurrentVersion
};
