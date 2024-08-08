const express = require('express');
const port = 4286;
const app = express();

app.use(express.json());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

app.set("view engine", "ejs");

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
app.use('/environmental-data', environmentalDataRoutes);

const arduinoRoutes = require('./routes/arduino');
app.use('/arduino-devices', arduinoRoutes);

const environmentalAvgRoutes = require('./routes/environmental_avg');
app.use('/environmental-data-avg', environmentalAvgRoutes);

const lastUpdateRoutes = require('./routes/lastupdate');
app.use('/last-updates', lastUpdateRoutes);

const plantRoutes = require('./routes/plant');
app.use('/plants', plantRoutes);

const globalParamRoutes = require('./routes/global_param');
app.use('/global-parameters', globalParamRoutes);

const Data_rtr = require('./routes/data');
app.use('/data', Data_rtr);

app.listen(port, () => {
    console.log(`Now listening on port http://localhost:${port}`);
});
