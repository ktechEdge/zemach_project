const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const databaseConfig = require('./config/database');

// Initialize Express App
const app = express();
const port = 7575; // Use one port

// Global variables
global.environmentalData = [];
global.lastMeasurementTime = null;
global.dbPool = databaseConfig.pool;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static Files
app.use(express.static(path.join(__dirname, 'css')));
app.use(express.static(path.join(__dirname, 'js')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'Gen_Edge_Design_Main')));
app.use("/inc", express.static(path.join(__dirname, "inc")));

// Routes
const fe_rtr = require('./routes/FE_R');
app.use('/', fe_rtr);

const environmentalDataRoutes = require('./routes/environmental');
app.use('/environmental', environmentalDataRoutes);

const arduinoRoutes = require('./routes/arduino');
app.use('/arduino-devices', arduinoRoutes);

const environmentalAvgRoutes = require('./routes/environmental_avg');
app.use('/environmental-data-avg', environmentalAvgRoutes);

const plantRoutes = require('./routes/plant');
app.use('/plants', plantRoutes);

const environmentalAvgEsp = require('./routes/espRouter');
app.use('/esp', environmentalAvgEsp);

const globalParamRoutes = require('./routes/global_param');
app.use('/global-parameters', globalParamRoutes);

const lastUpdateRoutes = require('./routes/lastupdate');
app.use('/last-updates', lastUpdateRoutes);

const firmwareRoutes = require('./routes/firmware');
app.use('/firmware', firmwareRoutes);

// File Operations (Saving and Reading device data)
app.post('/save_device_data', (req, res) => {
    const data = req.body;
    fs.writeFile('device_data.json', JSON.stringify(data, null, 2), (err) => {
        if (err) {
            console.error('Error saving data:', err);
            res.status(500).send('Error saving data');
        } else {
            res.send('Data saved successfully');
        }
    });
});

app.get('/device_data', (req, res) => {
    fs.readFile('device_data.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading data:', err);
            res.status(500).send('Error reading data');
        } else {
            res.json(JSON.parse(data));
        }
    });
});

// Serving static plants.json file
app.get('/plants.json', (req, res) => {
    res.sendFile(path.join(__dirname, 'plants.json'));
});

// Start the Server
app.listen(port, () => {
    console.log(`Now listening on http://localhost:${port}`);
});
