const express = require('express');
const router = express.Router();
const globalParamMiddleware = require('../middleware/global_param');

/**
 * @swagger
 * tags:
 *   name: GlobalParam
 *   description: Global parameter management
 */

/**
 * @swagger
 * /global-parameters:
 *   post:
 *     summary: Create a new global parameter
 *     tags: [GlobalParam]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               interval_in:
 *                 type: integer
 *               interval_log:
 *                 type: string
 *                 format: time
 *     responses:
 *       200:
 *         description: The created global parameter.
 */
router.post('/', globalParamMiddleware.createGlobalParam);

/**
 * @swagger
 * /global-parameters:
 *   get:
 *     summary: Get all global parameters
 *     tags: [GlobalParam]
 *     responses:
 *       200:
 *         description: List of all global parameters
 */
router.get('/', globalParamMiddleware.getAllGlobalParams);

/**
 * @swagger
 * /global-parameters/{id}:
 *   get:
 *     summary: Get a global parameter by ID
 *     tags: [GlobalParam]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The global parameter data
 */
router.get('/:id', globalParamMiddleware.getGlobalParamById);

/**
 * @swagger
 * /global-parameters/{id}:
 *   put:
 *     summary: Update a global parameter by ID
 *     tags: [GlobalParam]
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
 *               interval_in:
 *                 type: integer
 *               interval_log:
 *                 type: string
 *                 format: time
 *     responses:
 *       200:
 *         description: The updated global parameter
 */
router.put('/:id', globalParamMiddleware.updateGlobalParam);

/**
 * @swagger
 * /global-parameters/{id}:
 *   delete:
 *     summary: Delete a global parameter by ID
 *     tags: [GlobalParam]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The deleted global parameter
 */
router.delete('/:id', globalParamMiddleware.deleteGlobalParam);

module.exports = router;
