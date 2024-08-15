const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const express = require('express');
const port = 8080;
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

const path = require('path');
app.use("/css",express.static(path.join(__dirname, "css")));
app.use("/js" ,express.static(path.join(__dirname, "js")));
app.use("/inc" ,express.static(path.join(__dirname, "inc")));


const databaseConfig = require('./config/database');
global.dbPool = databaseConfig.pool;



//---------- routers ---------------------------------
const FrontPages = require('./routes/FE_R');
app.use('/', FrontPages);


const environmentalDataRoutes = require('./routes/environmental');
app.use('/esp', environmentalDataRoutes);

const arduinoRoutes = require('./routes/arduino');
app.use('/arduino-devices', arduinoRoutes);

const environmentalAvgRoutes = require('./routes/environmental_avg');
app.use('/environmental-data-avg', environmentalAvgRoutes);

const plantRoutes = require('./routes/plant');
app.use('/plants', plantRoutes);


const firmwareRoutes = require('./routes/firmware');
app.use('/firmware', firmwareRoutes);


app.listen(port, () => {
    console.log(`Now listening on port http://localhost:${port}`);
});
