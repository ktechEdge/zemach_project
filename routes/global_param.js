const express = require('express');
const router = express.Router();
const globalParamModel = require('../modules/global_param');

// Get all global parameters
router.get('/', (req, res) => {
    globalParamModel.getAllGlobalParams((err, data) => {
        if (err) {
            console.error('Error retrieving global parameters:', err);
            return res.status(500).send('Error retrieving global parameters');
        }
        res.send(data);
    });
});

// Get global parameter by ID
router.get('/:id', (req, res) => {
    globalParamModel.getGlobalParamById(req.params.id, (err, data) => {
        if (err) {
            console.error('Error retrieving global parameter by ID:', err);
            return res.status(500).send('Error retrieving global parameter by ID');
        }
        if (!data || data.length === 0) {
            return res.status(404).send('Global parameter not found');
        }
        res.send(data);
    });
});

// Create new global parameter
router.post('/', (req, res) => {
    const data = req.body;
    globalParamModel.createGlobalParam(data, (err, result) => {
        if (err) {
            console.error('Error creating global parameter:', err);
            return res.status(500).send('Error creating global parameter');
        }
        res.status(201).send(result);
    });
});

// Update global parameter by ID
router.put('/:id', (req, res) => {
    const data = req.body;
    globalParamModel.updateGlobalParam(req.params.id, data, (err, result) => {
        if (err) {
            console.error('Error updating global parameter:', err);
            return res.status(500).send('Error updating global parameter');
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Global parameter not found');
        }
        res.send(result);
    });
});

// Delete global parameter by ID
router.delete('/:id', (req, res) => {
    globalParamModel.deleteGlobalParam(req.params.id, (err, result) => {
        if (err) {
            console.error('Error deleting global parameter:', err);
            return res.status(500).send('Error deleting global parameter');
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Global parameter not found');
        }
        res.send(result);
    });
});

module.exports = router;
