const express = require('express');
const router = express.Router();
const environmentalAvgMiddleware = require('../middleware/environmental_avg');

/**
 * @swagger
 * tags:
 *   name: EnvironmentalAvgData
 *   description: Environmental average data management
 */

/**
 * @swagger
 * /environmental-data-avg:
 *   post:
 *     summary: Create a new environmental average data entry
 *     tags: [EnvironmentalAvgData]
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
 *                 type: integer
 *               soil_humidity:
 *                 type: integer
 *               measurement_date:
 *                 type: string
 *                 format: date-time
 *               plant_ID:
 *                 type: integer
 *     responses:
 *       200:
 *         description: The created environmental average data entry.
 */
router.post('/', environmentalAvgMiddleware.createEnvironmentalAvgData);

/**
 * @swagger
 * /environmental-data-avg:
 *   get:
 *     summary: Get all environmental average data
 *     tags: [EnvironmentalAvgData]
 *     responses:
 *       200:
 *         description: List of all environmental average data entries
 */
router.get('/', environmentalAvgMiddleware.getAllEnvironmentalAvgData);

/**
 * @swagger
 * /environmental-data-avg/{id}:
 *   get:
 *     summary: Get an environmental average data entry by ID
 *     tags: [EnvironmentalAvgData]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The environmental average data entry
 */
router.get('/:id', environmentalAvgMiddleware.getEnvironmentalAvgDataById);

/**
 * @swagger
 * /environmental-data-avg/{id}:
 *   put:
 *     summary: Update an environmental average data entry by ID
 *     tags: [EnvironmentalAvgData]
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
 *                 type: integer
 *               soil_humidity:
 *                 type: integer
 *               measurement_date:
 *                 type: string
 *                 format: date-time
 *               plant_ID:
 *                 type: integer
 *     responses:
 *       200:
 *         description: The updated environmental average data entry
 */
router.put('/:id', environmentalAvgMiddleware.updateEnvironmentalAvgData);

/**
 * @swagger
 * /environmental-data-avg/{id}:
 *   delete:
 *     summary: Delete an environmental average data entry by ID
 *     tags: [EnvironmentalAvgData]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The deleted environmental average data entry
 */
router.delete('/:id', environmentalAvgMiddleware.deleteEnvironmentalAvgData);

module.exports = router;
