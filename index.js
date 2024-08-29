// const express = require('express');
// const port = 4286;
// const app = express();
//
// app.use(express.json());
//
// const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({ extended: false }));
//
// app.set("view engine", "ejs");
//
// const path = require('path');
// app.use("/css",express.static(path.join(__dirname, "css")));
// app.use("/js" ,express.static(path.join(__dirname, "js")));
// app.use("/inc" ,express.static(path.join(__dirname, "inc")));
// app.get('/plants.json', (req, res) => {
//     res.sendFile(path.join(__dirname, './plants.json'));
// });
//
//
// const databaseConfig = require('./config/database');
// global.dbPool = databaseConfig.pool;
//
// //---------- routers ---------------------------------
// const FrontPages = require('./routes/FE_R');
// app.use('/', FrontPages);
//
// const environmentalDataRoutes = require('./routes/environmental');
// app.use('/environmental-data', environmentalDataRoutes);
//
// const arduinoRoutes = require('./routes/arduino');
// app.use('/arduino-devices', arduinoRoutes);
//
// const environmentalAvgRoutes = require('./routes/environmental_avg');
// app.use('/environmental-data-avg', environmentalAvgRoutes);
//
// const lastUpdateRoutes = require('./routes/lastupdate');
// app.use('/last-updates', lastUpdateRoutes);
//
// const plantRoutes = require('./routes/plant');
// app.use('/plants', plantRoutes);
//
// const globalParamRoutes = require('./routes/global_param');
// app.use('/global-parameters', globalParamRoutes);
//
// const Data_rtr = require('./routes/data');
// app.use('/data', Data_rtr);
// app.listen(port, () => {
//     console.log(`Now listening on port http://localhost:${port}`);
// });

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const express = require('express');
const fs = require('fs');
const path = require('path');
const port = 4286;
const app = express();
global.environmentalData = []; // משתנה גלובלי
global.lastMeasurementTime = null; // זמן המדידה האחרון
const cors = require("cors");
app.use(cors());

app.use(express.json());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));


// Set 'ejs' as the view engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use("/css",express.static(path.join(__dirname, "css")));
app.use("/js" ,express.static(path.join(__dirname, "js")));
app.use("/inc" ,express.static(path.join(__dirname, "inc")));


const databaseConfig = require('./config/database');
global.dbPool = databaseConfig.pool;



//---------- routers ---------------------------------
const FrontPages = require('./routes/FE_R');
app.use('/', FrontPages);


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

app.post('/save_device_data', (req, res) => {
    const data = req.body;
    fs.writeFile('device_data.json', JSON.stringify(data, null, 2), (err) => {
        if (err) {
            console.error('Error saving data:', err);
            res.status(500).send('Error saving data');
        } else {
            console.error('Data saved successfully');
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
    res.sendFile(path.join(__dirname, '/plants.json'));
});
app.listen(port, () => {
    console.log(`Now listening on port http://localhost:${port}`);
});