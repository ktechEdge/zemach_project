const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const express = require('express');
const port = 8080;
const app = express();

app.use(express.json());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

app.set("view engine", "ejs");

const path = require('path');
app.use(express.static(path.join(__dirname, "css")));
app.use(express.static(path.join(__dirname, "js")));

const databaseConfig = require('./config/database');
global.dbPool = databaseConfig.pool;

// הגדרות Swagger
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Environmental Monitoring API',
            version: '1.0.0',
            description: 'API for managing environmental data and devices',
        },
        servers: [
            {
                url: `http://localhost:${port}`,
            },
        ],
    },
    apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get('/', function (req, res) {
    res.send('Hello World');
});

const environmentalDataRoutes = require('./routes/environmental');
app.use('/environmental-data', environmentalDataRoutes);

const arduinoRoutes = require('./routes/arduino');
app.use('/arduino-devices', arduinoRoutes);

const environmentalAvgRoutes = require('./routes/environmental_avg');
app.use('/environmental-data-avg', environmentalAvgRoutes);

const plantRoutes = require('./routes/plant');
app.use('/plants', plantRoutes);

const espRouter =  require('./routes/espRouter')
app.use('/api-arduino', espRouter);



app.listen(port, () => {
    console.log(`Now listening on port http://localhost:${port}`);
});
