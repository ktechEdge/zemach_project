const express = require('express');
const router = express.Router();
const environmentalDataAvgMiddleware = require('../middleware/environmental_avg');

// Get all environmental average data
router.get('/', async (req, res) => {
    try {
        const data = await environmentalDataAvgMiddleware.getAllEnvironmentalAvgData();
        res.send(data);
    } catch (err) {
        console.error('Error retrieving environmental average data:', err);
        res.status(500).send('Error retrieving environmental average data');
    }
});

// Get environmental average data by ID
router.get('/:id', async (req, res) => {
    try {
        const data = await environmentalDataAvgMiddleware.getEnvironmentalAvgDataById(req.params.id);
        if (!data) {
            return res.status(404).send('Environmental average data not found');
        }
        res.send(data);
    } catch (err) {
        console.error('Error retrieving environmental average data by ID:', err);
        res.status(500).send('Error retrieving environmental average data by ID');
    }
});

// Create new environmental average data
router.post('/', async (req, res) => {
    try {
        const result = await environmentalDataAvgMiddleware.createEnvironmentalAvgData(req.body);
        res.status(201).send({ id: result.insertId });
    } catch (err) {
        console.error('Error creating environmental average data:', err);
        res.status(500).send('Error creating environmental average data');
    }
});

// Update environmental average data by ID
router.put('/:id', async (req, res) => {
    try {
        await environmentalDataAvgMiddleware.updateEnvironmentalAvgData(req.params.id, req.body);
        res.send('Environmental average data updated');
    } catch (err) {
        console.error('Error updating environmental average data:', err);
        res.status(500).send('Error updating environmental average data');
    }
});

// Delete environmental average data by ID
router.delete('/:id', async (req, res) => {
    try {
        await environmentalDataAvgMiddleware.deleteEnvironmentalAvgData(req.params.id);
        res.send('Environmental average data deleted');
    } catch (err) {
        console.error('Error deleting environmental average data:', err);
        res.status(500).send('Error deleting environmental average data');
    }
});

module.exports = router;
