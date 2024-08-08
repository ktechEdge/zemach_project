const express = require('express');
const router = express.Router();

router.get('/GetAllData', (req, res) => {
    const query = 'SELECT * FROM environmental_data_avg';
    dbPool.query(query, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'An error occurred while fetching data' });
        } else {
            res.json(results);
        }
    });
});

console.log(`Now listening on port http://localhost:${4286}/data/GetAllData`);
module.exports = router; //stam