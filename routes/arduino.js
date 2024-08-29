const express = require('express');
const router = express.Router();
const arduinoMiddleware = require('../middleware/arduino');

/**
 * @swagger
 * tags:
 *   name: Arduino
 *   description: Arduino device management
 */

/**
 * @swagger
 * /arduino-devices:
 *   post:
 *     summary: Create a new Arduino device
 *     tags: [Arduino]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               device_id:
 *                 type: integer
 *               plant_id_1:
 *                 type: integer
 *               plant_id_2:
 *                 type: integer
 *               plant_id_3:
 *                 type: integer
 *     responses:
 *       200:
 *         description: The created Arduino device.
 */
router.post('/', arduinoMiddleware.createArduino);

/**
 * @swagger
 * /arduino-devices:
 *   get:
 *     summary: Get all Arduino devices
 *     tags: [Arduino]
 *     responses:
 *       200:
 *         description: List of all Arduino devices
 */
router.get('/', arduinoMiddleware.getAllArduinos);

/**
 * @swagger
 * /arduino-devices/{id}:
 *   get:
 *     summary: Get an Arduino device by ID
 *     tags: [Arduino]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The Arduino device data
 */
router.get('/:id', arduinoMiddleware.getArduinoById);

/**
 * @swagger
 * /arduino-devices/{id}:
 *   put:
 *     summary: Update an Arduino device by ID
 *     tags: [Arduino]
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
 *               plant_id_1:
 *                 type: integer
 *               plant_id_2:
 *                 type: integer
 *               plant_id_3:
 *                 type: integer
 *     responses:
 *       200:
 *         description: The updated Arduino device
 */
router.put('/:id', arduinoMiddleware.updateArduino);

/**
 * @swagger
 * /arduino-devices/{id}:
 *   delete:
 *     summary: Delete an Arduino device by ID
 *     tags: [Arduino]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The deleted Arduino device
 */
router.delete('/:id', arduinoMiddleware.deleteArduino);

module.exports = router;
