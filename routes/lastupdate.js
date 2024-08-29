const express = require('express');
const router = express.Router();
const lastUpdateMiddleware = require('../middleware/lastupdate');

/**
 * @swagger
 * tags:
 *   name: LastUpdate
 *   description: Last update management
 */

/**
 * @swagger
 * /last-updates:
 *   post:
 *     summary: Create a new last update entry
 *     tags: [LastUpdate]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               device_id:
 *                 type: integer
 *               LastUpdate:
 *                 type: string
 *                 format: time
 *     responses:
 *       200:
 *         description: The created last update entry.
 */
router.post('/', lastUpdateMiddleware.createLastUpdate);

/**
 * @swagger
 * /last-updates:
 *   get:
 *     summary: Get all last updates
 *     tags: [LastUpdate]
 *     responses:
 *       200:
 *         description: List of all last updates
 */
router.get('/', lastUpdateMiddleware.getAllLastUpdates);

/**
 * @swagger
 * /last-updates/{id}:
 *   get:
 *     summary: Get a last update entry by ID
 *     tags: [LastUpdate]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The last update entry
 */
router.get('/:id', lastUpdateMiddleware.getLastUpdateById);

/**
 * @swagger
 * /last-updates/{id}:
 *   put:
 *     summary: Update a last update entry by ID
 *     tags: [LastUpdate]
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
 *               LastUpdate:
 *                 type: string
 *                 format: time
 *     responses:
 *       200:
 *         description: The updated last update entry
 */
router.put('/:id', lastUpdateMiddleware.updateLastUpdate);

/**
 * @swagger
 * /last-updates/{id}:
 *   delete:
 *     summary: Delete a last update entry by ID
 *     tags: [LastUpdate]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The deleted last update entry
 */
router.delete('/:id', lastUpdateMiddleware.deleteLastUpdate);

module.exports = router;
