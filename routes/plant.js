const express = require('express');
const router = express.Router();
const plantMiddleware = require('../middleware/plant');

router.get('/', (req, res) => {
    plantMiddleware.getAllPlants((err, data) => {
        if (err) {
            console.error('Error retrieving plants:', err);
            return res.status(500).send('Error retrieving plants');
        }
        res.send(data);
    });
});

router.get('/:id', (req, res) => {
    plantMiddleware.getPlantById(req.params.id, (err, data) => {
        if (err) {
            console.error('Error retrieving plant by ID:', err);
            return res.status(500).send('Error retrieving plant by ID');
        }
        if (!data) {
            return res.status(404).send('Plant not found');
        }
        res.send(data);
    });
});

router.post('/', (req, res) => {
    const data = req.body;
    plantMiddleware.createPlant(data, (err, result) => {
        if (err) {
            console.error('Error creating plant:', err);
            return res.status(500).send('Error creating plant');
        }
        res.status(201).send(result);
    });
});

router.put('/:id', (req, res) => {
    const data = req.body;
    plantMiddleware.updatePlant(req.params.id, data, (err, result) => {
        if (err) {
            console.error('Error updating plant:', err);
            return res.status(500).send('Error updating plant');
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Plant not found');
        }
        res.send(result);
    });
});

router.delete('/:id', (req, res) => {
    plantMiddleware.deletePlant(req.params.id, (err, result) => {
        if (err) {
            console.error('Error deleting plant:', err);
            return res.status(500).send('Error deleting plant');
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Plant not found');
        }
        res.send(result);
    });
});

module.exports = router;
