const express = require('express');
const router = express.Router();
const environmentalDataAvgMiddleware = require('../middleware/environmental_avg');

// Get all environmental average data
router.get('/', (req, res) => {
    environmentalDataAvgMiddleware.getAllEnvironmentalAvgData((err, data) => {
        if (err) {
            console.error('Error retrieving environmental average data:', err);
            return res.status(500).send('Error retrieving environmental average data');
        }
        res.send(data);
    });
});

// Get environmental average data by ID
router.get('/:id', (req, res) => {
    environmentalDataAvgMiddleware.getEnvironmentalAvgDataById(req.params.id, (err, data) => {
        if (err) {
            console.error('Error retrieving environmental average data by ID:', err);
            return res.status(500).send('Error retrieving environmental average data by ID');
        }
        if (!data) {
            return res.status(404).send('Environmental average data not found');
        }
        res.send(data);
    });
});

// Create new environmental average data
router.post('/', (req, res) => {
    environmentalDataAvgMiddleware.createEnvironmentalAvgData(req.body, (err, result) => {
        if (err) {
            console.error('Error creating environmental average data:', err);
            return res.status(500).send('Error creating environmental average data');
        }
        res.status(201).send({ id: result.insertId });
    });
});

// Update environmental average data by ID
router.put('/:id', (req, res) => {
    environmentalDataAvgMiddleware.updateEnvironmentalAvgData(req.params.id, req.body, (err) => {
        if (err) {
            console.error('Error updating environmental average data:', err);
            return res.status(500).send('Error updating environmental average data');
        }
        res.send('Environmental average data updated');
    });
});

// Delete environmental average data by ID
router.delete('/:id', (req, res) => {
    environmentalDataAvgMiddleware.deleteEnvironmentalAvgData(req.params.id, (err) => {
        if (err) {
            console.error('Error deleting environmental average data:', err);
            return res.status(500).send('Error deleting environmental average data');
        }
        res.send('Environmental average data deleted');
    });
});

module.exports = router;
