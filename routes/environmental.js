const express = require('express');
const router = express.Router();
const environmentalDataMiddleware = require('../models/environmental');


// Get all environmental data
router.get('/', async (req, res) => {
    try {
        const data = await environmentalDataMiddleware.getAllData();
        res.send(data);
    } catch (err) {
        console.error('Error retrieving environmental data:', err);
        res.status(500).send('Error retrieving environmental data');
    }
});

// Get environmental data by ID
router.get('/:id', (req, res) => {
    environmentalDataMiddleware.getDataById(req.params.id, (err, data) => {
        if (err) {
            console.error('Error retrieving environmental data:', err);
            return res.status(500).send('Error retrieving environmental data');
        }
        if (!data) {
            return res.status(404).send('Environmental data not found');
        }
        res.send(data);
    });
});

// Create new environmental data
router.post('/', (req, res) => {
    console.log(req.body);
    environmentalDataMiddleware.createData(req.body, (err, id) => {
        if (err) {
            console.error('Error creating environmental data:', err);
            return res.status(500).send('Error creating environmental data');
        }
        res.status(201).send({ id });
    });
});



module.exports = router;
