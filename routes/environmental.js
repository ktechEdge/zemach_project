const express = require('express');
const router = express.Router();
const environmentalDataMiddleware = require('../middleware/environmental');

/**
 * @swagger
 * tags:
 *   name: EnvironmentalData
 *   description: Environmental data management
 */

/**
 * @swagger
 * /environmental-data:
 *   get:
 *     summary: Get all environmental data
 *     tags: [EnvironmentalData]
 *     responses:
 *       200:
 *         description: List of all environmental data
 *       500:
 *         description: Error retrieving environmental data
 */
router.get('/', (req, res) => {
    environmentalDataMiddleware.getAllData((err, data) => {
        if (err) {
            console.error('Error retrieving environmental data:', err);
            return res.status(500).send('Error retrieving environmental data');
        }
        res.send(data);
    });
});

/**
 * @swagger
 * /environmental-data/{id}:
 *   get:
 *     summary: Get environmental data by ID
 *     tags: [EnvironmentalData]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Environmental data by ID
 *       404:
 *         description: Environmental data not found
 *       500:
 *         description: Error retrieving environmental data
 */
router.get('/:id', (req, res) => {
    environmentalDataMiddleware.getDataById(req.params.id, (err, data) => {
        if (err) {
            console.error('Error retrieving environmental data:', err);
            return res.status(500).send('Error retrieving environmental data');
        }
        if (!data) {
            return res.status(404).send('Environmental data not found');
        }
        res.send(data);
    });
});

/**
 * @swagger
 * /environmental-data:
 *   post:
 *     summary: Create new environmental data
 *     tags: [EnvironmentalData]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               device_id:
 *                 type: integer
 *               uv_radiation:
 *                 type: integer
 *               light:
 *                 type: integer
 *               air_temperature:
 *                 type: number
 *               air_humidity:
 *                 type: number
 *               soil_humidity:
 *                 type: integer
 *               measurement_date:
 *                 type: string
 *     responses:
 *       201:
 *         description: The created environmental data.
 *       500:
 *         description: Error creating environmental data
 */
router.post('/', (req, res) => {
    environmentalDataMiddleware.createData(req.body, (err, id) => {
        if (err) {
            console.error('Error creating environmental data:', err);
            return res.status(500).send('Error creating environmental data');
        }
        res.status(201).send({ id });
    });
});

/**
 * @swagger
 * /environmental-data/{id}:
 *   put:
 *     summary: Update environmental data by ID
 *     tags: [EnvironmentalData]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               device_id:
 *                 type: integer
 *               uv_radiation:
 *                 type: integer
 *               light:
 *                 type: integer
 *               air_temperature:
 *                 type: number
 *               air_humidity:
 *                 type: number
 *               soil_humidity:
 *                 type: integer
 *               measurement_date:
 *                 type: string
 *     responses:
 *       200:
 *         description: The updated environmental data
 *       404:
 *         description: Environmental data not found
 *       500:
 *         description: Error updating environmental data
 */
router.put('/:id', (req, res) => {
    environmentalDataMiddleware.updateData(req.params.id, req.body, (err) => {
        if (err) {
            console.error('Error updating environmental data:', err);
            return res.status(500).send('Error updating environmental data');
        }
        res.send('Environmental data updated');
    });
});

/**
 * @swagger
 * /environmental-data/{id}:
 *   delete:
 *     summary: Delete environmental data by ID
 *     tags: [EnvironmentalData]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The deleted environmental data
 *       404:
 *         description: Environmental data not found
 *       500:
 *         description: Error deleting environmental data
 */
router.delete('/:id', (req, res) => {
    environmentalDataMiddleware.deleteData(req.params.id, (err) => {
        if (err) {
            console.error('Error deleting environmental data:', err);
            return res.status(500).send('Error deleting environmental data');
        }
        res.send('Environmental data deleted');
    });
});

module.exports = router;
