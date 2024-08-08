const express = require('express');
const router = express.Router();

let esp = [];

// Middleware to validate the received data
const validateSensorData = (req, res, next) => {
    if (!Array.isArray(req.body) || req.body.length === 0) {
        return res.status(400).send('Invalid sensor data format');
    }
    next();
};

// Route to handle GET request by index
router.get('/esp/:index', (req, res) => {
    const index = req.params.index;
    if (index >= esp.length || index < 0) {
        return res.status(404).send('Index out of bounds');
    }
    res.status(200).json(esp[index]);
});

// Route to handle POST request from Arduino
router.post('/esp', validateSensorData, (req, res) => {
    for (let k = 1; k < req.body.length; k++) {
        esp[k] = req.body[k];
    }
    console.log(req.body);
    res.status(200).send('Data received successfully');
});

module.exports = router;
