/**
 * @swagger
 * components:
 *   schemas:
 *     Data:
 *       type: object
 *       required:
 *         - id
 *         - arduino
 *         - radiation
 *         - light
 *         - air_temperature
 *         - soil_humidity
 *         - measurement_date
 *         - LastUpdate
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the data entry
 *         arduino:
 *           type: integer
 *           description: The identifier for the Arduino device
 *         radiation:
 *           type: string
 *           description: The radiation level
 *         light:
 *           type: string
 *           description: The light intensity
 *         air_temperature:
 *           type: string
 *           description: The air temperature in Celsius
 *         soil_humidity:
 *           type: string
 *           description: The soil humidity percentage
 *         measurement_date:
 *           type: string
 *           format: date-time
 *           description: The date and time the measurement was taken
 *         LastUpdate:
 *           type: string
 *           description: The last update time
 *
 */
/**
 * @swagger
 * tags:
 *   name: Data
 *   description: The data managing API
 * /data:
 *   get:
 *     summary: Lists all the data entries
 *     tags: [Data]
 *     responses:
 *       200:
 *         description: The list of the data entries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Data'
 *   post:
 *     summary: Create a new data entry
 *     tags: [Data]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Data'
 *     responses:
 *       200:
 *         description: The created data entry.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Data'
 *       500:
 *         description: Some server error
 * /data/{id}:
 *   get:
 *     summary: Get the data entry by id
 *     tags: [Data]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The data entry id
 *     responses:
 *       200:
 *         description: The data entry response by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Data'
 *       404:
 *         description: The data entry was not found
 *   put:
 *    summary: Update the data entry by id
 *    tags: [Data]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: The data entry id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Data'
 *    responses:
 *      200:
 *        description: The data entry was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Data'
 *      404:
 *        description: The data entry was not found
 *      500:
 *        description: Some error happened
 *   delete:
 *     summary: Remove the data entry by id
 *     tags: [Data]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The data entry id
 *     responses:
 *       200:
 *         description: The data entry was deleted
 *       404:
 *         description: The data entry was not found
 */

const express = require('express');
const router = express.Router()
module.exports = router;


router.get("/",(req, res) => {
    let query="SELECT * FROM `environmental_data`";
    db_pool.query(query, function(err, rows, fields){

        if(err)
        {
            res.status(500).json({message: err})
            // throw err;
        }
        else
        {
            res.status(200).json(rows );
        }
    });
});


// API endpoint to insert data

router.post("/addEnvironmentalData", function (req, res) {
    // קליטת הנתונים
    let arduino = req.body.arduino;
    let radiation = req.body.radiation;
    let light = req.body.light;
    let air_temperature = req.body.air_temperature;
    let soil_humidity = req.body.soil_humidity;
    let measurement_date = req.body.measurement_date;
    let LastUpdate = req.body.LastUpdate;

    // SQL query to insert data
    const Query = `
    INSERT INTO environmental_data (
        arduino, 
        radiation, 
        light, 
        air_temperature, 
        soil_humidity, 
        measurement_date, 
        LastUpdate
    ) VALUES 
     ('${arduino}', '${radiation}', '${light}', '${air_temperature}', '${soil_humidity}', '${measurement_date}','${LastUpdate}')
`;


    db_pool.query(Query, function (err, rows, fields) {
        if (err) {
            res.status(500).json({ message: err });
        } else {
            res.status(200).json({ message: "OK" });
        }
    });
});



router.get("/addArduino", function (req, res) {

    // SQL query to insert data
    const query = `INSERT INTO arduino (id) VALUES (NULL)`;

    db_pool.query(query, function (err, rows, fields) {
        if (err) {
            res.status(500).json({ message: err });
        } else {
            res.status(200).json({ message: "OK" });
        }
    });
});
