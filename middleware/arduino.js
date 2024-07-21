const dbPool = require('../dbPool');

exports.createArduino = (req, res) => {
    const data = req.body;
    const sql = 'INSERT INTO arduino SET ?';
    dbPool.query(sql, data, (err, result) => {
        if (err) {
            console.error('Error creating Arduino device:', err);
            return res.status(500).send('Error creating Arduino device');
        }
        res.status(201).send(result);
    });
};

exports.getAllArduinos = (req, res) => {
    const sql = 'SELECT * FROM arduino';
    dbPool.query(sql, (err, results) => {
        if (err) {
            console.error('Error retrieving Arduino devices:', err);
            return res.status(500).send('Error retrieving Arduino devices');
        }
        res.send(results);
    });
};

exports.getArduinoById = (req, res) => {
    const sql = 'SELECT * FROM arduino WHERE id = ?';
    dbPool.query(sql, [req.params.id], (err, result) => {
        if (err) {
            console.error('Error retrieving Arduino device:', err);
            return res.status(500).send('Error retrieving Arduino device');
        }
        if (result.length === 0) {
            return res.status(404).send('Arduino device not found');
        }
        res.send(result);
    });
};

exports.updateArduino = (req, res) => {
    const data = req.body;
    const sql = 'UPDATE arduino SET ? WHERE id = ?';
    dbPool.query(sql, [data, req.params.id], (err, result) => {
        if (err) {
            console.error('Error updating Arduino device:', err);
            return res.status(500).send('Error updating Arduino device');
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Arduino device not found');
        }
        res.send(result);
    });
};

exports.deleteArduino = (req, res) => {
    const sql = 'DELETE FROM arduino WHERE id = ?';
    dbPool.query(sql, [req.params.id], (err, result) => {
        if (err) {
            console.error('Error deleting Arduino device:', err);
            return res.status(500).send('Error deleting Arduino device');
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Arduino device not found');
        }
        res.send(result);
    });
};
