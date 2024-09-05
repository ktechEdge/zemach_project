const express = require('express');
const router = express.Router();
const lastUpdateModel = require('../models/lastupdate');

// Get all last updates
router.get('/', (req, res) => {
    lastUpdateModel.getAllLastUpdates((err, data) => {
        if (err) {
            console.error('Error retrieving last updates:', err);
            return res.status(500).send('Error retrieving last updates');
        }
        res.send(data);
    });
});

// Get last update by ID
router.get('/:id', (req, res) => {
    lastUpdateModel.getLastUpdateById(req.params.id, (err, data) => {
        if (err) {
            console.error('Error retrieving last update entry by ID:', err);
            return res.status(500).send('Error retrieving last update entry by ID');
        }
        if (!data || data.length === 0) {
            return res.status(404).send('Last update entry not found');
        }
        res.send(data);
    });
});

// Create new last update entry
router.post('/', (req, res) => {
    const data = req.body;
    lastUpdateModel.createLastUpdate(data, (err, result) => {
        if (err) {
            console.error('Error creating last update entry:', err);
            return res.status(500).send('Error creating last update entry');
        }
        res.status(201).send(result);
    });
});

// Update last update entry by ID
router.put('/:id', (req, res) => {
    const data = req.body;
    lastUpdateModel.updateLastUpdate(req.params.id, data, (err, result) => {
        if (err) {
            console.error('Error updating last update entry:', err);
            return res.status(500).send('Error updating last update entry');
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Last update entry not found');
        }
        res.send(result);
    });
});

// Delete last update entry by ID
router.delete('/:id', (req, res) => {
    lastUpdateModel.deleteLastUpdate(req.params.id, (err, result) => {
        if (err) {
            console.error('Error deleting last update entry:', err);
            return res.status(500).send('Error deleting last update entry');
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Last update entry not found');
        }
        res.send(result);
    });
});

module.exports = router;
