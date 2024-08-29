const express = require('express');
const router = express.Router();

const environmentalAvgMiddleware = require('../middleware/data');


router.get('/GetAllData', environmentalAvgMiddleware.GetData, (req, res) => {
    if (req.error) {
        res.status(500).json({ error: req.error.message });
    } else {
        res.json(req.result);
    }
});


console.log(`Now listening on port http://localhost:${4286}/data/GetAllData`);
module.exports = router;