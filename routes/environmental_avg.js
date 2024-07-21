const express = require('express');
const router = express.Router();
const environmentalAvgMiddleware = require('../middleware/environmental_avg');

router.get('/', (req, res) => {
    environmentalAvgMiddleware.getAllEnvironmentalAvgData((err, data) => {
        if (err) {
            console.error('Error retrieving environmental average data:', err);
            return res.status(500).send('Error retrieving environmental average data');
        }
        res.send(data);
    });
});

router.get('/:id', (req, res) => {
    environmentalAvgMiddleware.getEnvironmentalAvgDataById(req.params.id, (err, data) => {
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

router.post('/', (req, res) => {
    const data = req.body;
    environmentalAvgMiddleware.createEnvironmentalAvgData(data, (err, result) => {
        if (err) {
            console.error('Error creating environmental average data:', err);
            return res.status(500).send('Error creating environmental average data');
        }
        res.status(201).send(result);
    });
});

router.put('/:id', (req, res) => {
    const data = req.body;
    environmentalAvgMiddleware.updateEnvironmentalAvgData(req.params.id, data, (err, result) => {
        if (err) {
            console.error('Error updating environmental average data:', err);
            return res.status(500).send('Error updating environmental average data');
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Environmental average data not found');
        }
        res.send(result);
    });
});

router.delete('/:id', (req, res) => {
    environmentalAvgMiddleware.deleteEnvironmentalAvgData(req.params.id, (err, result) => {
        if (err) {
            console.error('Error deleting environmental average data:', err);
            return res.status(500).send('Error deleting environmental average data');
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Environmental average data not found');
        }
        res.send(result);
    });
});

module.exports = router;
