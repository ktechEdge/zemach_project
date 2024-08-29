const arduinoModel = require('../modules/arduino');


exports.createArduino = (req, res) => {
    const data = req.body;
    arduinoModel.createArduino(data, (err, result) => {
        if (err) {
            console.error('Error creating Arduino device:', err);
            return res.status(500).send('Error creating Arduino device');
        }
        res.status(201).send(result);
    });
};

exports.getAllArduinos = (req, res) => {
    arduinoModel.getAllArduinos((err, results) => {
        if (err) {
            console.error('Error retrieving Arduino devices:', err);
            return res.status(500).send('Error retrieving Arduino devices');
        }
        res.send(results);
    });
};

exports.getArduinoById = (req, res) => {
    arduinoModel.getArduinoById(req.params.id, (err, result) => {
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
    arduinoModel.updateArduino(req.params.id, data, (err, result) => {
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
    arduinoModel.deleteArduino(req.params.id, (err, result) => {
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
