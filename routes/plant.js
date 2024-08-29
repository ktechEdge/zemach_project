const express = require('express');
const router = express.Router();
const plantMiddleware = require('../middleware/plant');

/**
 * @swagger
 * tags:
 *   name: Plant
 *   description: Plant management
 */

/**
 * @swagger
 * /plants:
 *   post:
 *     summary: Create a new plant
 *     tags: [Plant]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               row:
 *                 type: integer
 *               col:
 *                 type: integer
 *     responses:
 *       200:
 *         description: The created plant.
 */
router.post('/', plantMiddleware.createPlant);

/**
 * @swagger
 * /plants:
 *   get:
 *     summary: Get all plants
 *     tags: [Plant]
 *     responses:
 *       200:
 *         description: List of all plants
 */
router.get('/', plantMiddleware.getAllPlants);

/**
 * @swagger
 * /plants/{id}:
 *   get:
 *     summary: Get a plant by ID
 *     tags: [Plant]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The plant data
 */
router.get('/:id', plantMiddleware.getPlantById);

/**
 * @swagger
 * /plants/{id}:
 *   put:
 *     summary: Update a plant by ID
 *     tags: [Plant]
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
 *               row:
 *                 type: integer
 *               col:
 *                 type: integer
 *     responses:
 *       200:
 *         description: The updated plant
 */
router.put('/:id', plantMiddleware.updatePlant);

/**
 * @swagger
 * /plants/{id}:
 *   delete:
 *     summary: Delete a plant by ID
 *     tags: [Plant]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The deleted plant
 */
router.delete('/:id', plantMiddleware.deletePlant);

module.exports = router;
