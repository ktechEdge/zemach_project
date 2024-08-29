const express = require('express');
const router = express.Router();
const environmentalMiddleware = require('../middleware/environmental');

/**
 * @swagger
 * tags:
 *   name: EnvironmentalData
 *   description: Environmental data management
 */

/**
 * @swagger
 * /environmental-data:
 *   post:
 *     summary: Create a new environmental data entry
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
 *                 type: integer
 *               soil_humidity:
 *                 type: integer
 *               measurement_date:
 *                 type: string
 *                 format: date-time
 *               plant_ID:
 *                 type: integer
 *               cnt:
 *                 type: integer
 *     responses:
 *       200:
 *         description: The created environmental data entry.
 */
router.post('/', environmentalMiddleware.createEnvironmentalData);

/**
 * @swagger
 * /environmental-data:
 *   get:
 *     summary: Get all environmental data
 *     tags: [EnvironmentalData]
 *     responses:
 *       200:
 *         description: List of all environmental data entries
 */
router.get('/', environmentalMiddleware.getAllEnvironmentalData);

/**
 * @swagger
 * /environmental-data/{id}:
 *   get:
 *     summary: Get an environmental data entry by ID
 *     tags: [EnvironmentalData]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The environmental data entry
 */
router.get('/:id', environmentalMiddleware.getEnvironmentalDataById);

/**
 * @swagger
 * /environmental-data/{id}:
 *   put:
 *     summary: Update an environmental data entry by ID
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
 *                 type: integer
 *               soil_humidity:
 *                 type: integer
 *               measurement_date:
 *                 type: string
 *                 format: date-time
 *               plant_ID:
 *                 type: integer
 *               cnt:
 *                 type: integer
 *     responses:
 *       200:
 *         description: The updated environmental data entry
 */
router.put('/:id', environmentalMiddleware.updateEnvironmentalData);

/**
 * @swagger
 * /environmental-data/{id}:
 *   delete:
 *     summary: Delete an environmental data entry by ID
 *     tags: [EnvironmentalData]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The deleted environmental data entry
 */
router.delete('/:id', environmentalMiddleware.deleteEnvironmentalData);

module.exports = router;
