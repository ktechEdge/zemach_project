const express = require('express');
const router = express.Router();
const environmentalDataMiddleware = require('../middleware/environmental');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Path to the uploads folder inside zemach_project
const uploadDir = path.join(__dirname, '../uploads');
const versionFilePath = path.join(__dirname, '../version.txt');

// Create new Esp trow environmental data
router.post('/', (req, res) => {
    console.log(req.body);
    environmentalDataMiddleware.createData(req.body, (err, id) => {
        if (err) {
            console.error('Error creating environmental data:', err);
            return res.status(500).send('Error creating environmental data');
        }
        res.status(201).send({ id });
    });
});

// Ensure the uploads directory exists
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log(`Created directory: ${uploadDir}`);
} else {
    console.log(`Directory already exists: ${uploadDir}`);
}

// Define storage location and filename handling
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Use the dynamically created directory
        console.log(`Storing file in directory: ${uploadDir}`);
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        // Get the version number from the client (submitted via form)
        const versionNumber = req.body.version || 'unknown';

        // Generate the filename based on the version number
        const filename = `firmware_v${versionNumber}${path.extname(file.originalname)}`;

        console.log(`Generated filename: ${filename}`);
        cb(null, filename); // Use the provided version number in the filename
    }
});

const upload = multer({ storage: storage });

// Endpoint to handle file upload
router.post('/upload', upload.single('firmware'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }

        console.log('File uploaded successfully:', req.file);

        // Save the version number to the version file
        const versionNumber = req.body.version;
        fs.writeFileSync(versionFilePath, versionNumber);
        console.log(`Updated version to: ${versionNumber}`);

        res.status(200).send(`Firmware uploaded successfully as version ${versionNumber}.`);
    } catch (error) {
        console.error('Error while uploading file:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Endpoint to download the most recent file in the uploads directory
router.get('/download', (req, res) => {
    fs.readdir(uploadDir, (err, files) => {
        if (err) {
            console.error('Error reading upload directory:', err);
            return res.status(500).send('Error occurred while retrieving files.');
        }

        // Filter out any non-files and sort by creation time, then get the last file
        const latestFile = files
            .map(fileName => ({
                name: fileName,
                time: fs.statSync(path.join(uploadDir, fileName)).mtime.getTime()
            }))
            .sort((a, b) => b.time - a.time)[0];

        if (!latestFile) {
            return res.status(404).send('No files found.');
        }

        const filePath = path.join(uploadDir, latestFile.name);

        console.log(`Sending latest file: ${latestFile.name}`);

        res.download(filePath, (err) => {
            if (err) {
                console.error('Error while downloading file:', err);
                res.status(500).send('Error occurred while downloading the file.');
            }
        });
    });
});

// Endpoint to get the current version number
router.get('/version', (req, res) => {
    try {
        // Read the current version from the file
        const currentVersion = fs.readFileSync(versionFilePath, 'utf8').trim();
        res.status(200).json({ version: currentVersion });
    } catch (error) {
        console.error('Error while reading version file:', error);
        res.status(500).send('Error occurred while retrieving the version.');
    }
});



module.exports = router;
