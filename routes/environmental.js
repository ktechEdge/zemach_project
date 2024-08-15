const express = require('express');
const router = express.Router();
const environmentalDataMiddleware = require('../middleware/environmental');


// Get all environmental data
router.get('/', (req, res) => {
    environmentalDataMiddleware.getAllData((err, data) => {
        if (err) {
            console.error('Error retrieving environmental data:', err);
            return res.status(500).send('Error retrieving environmental data');
        }
        res.send(data);
    });
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


// Update environmental data by ID
router.put('/:id', (req, res) => {
    environmentalDataMiddleware.updateData(req.params.id, req.body, (err) => {
        if (err) {
            console.error('Error updating environmental data:', err);
            return res.status(500).send('Error updating environmental data');
        }
        res.send('Environmental data updated');
    });
});


// Delete environmental data by ID
router.delete('/:id', (req, res) => {
    environmentalDataMiddleware.deleteData(req.params.id, (err) => {
        if (err) {
            console.error('Error deleting environmental data:', err);
            return res.status(500).send('Error deleting environmental data');
        }
        res.send('Environmental data deleted');
    });
});




module.exports = router;
