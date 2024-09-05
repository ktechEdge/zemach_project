const express = require('express');
const router = express.Router();
const environmentalAvgMiddleware = require('../middleware/data');

router.get('/GetAllData', async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        // const  startDate = '2024-08-25';
        // const endDate =  '2024-11-25 23:59:59';
        const data = await environmentalAvgMiddleware.GetData(startDate, endDate);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
console.log(`Now listening on port http://localhost:${4286}/data/GetAllData`);
module.exports = router;