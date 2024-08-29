const plantModel = require('../modules/plant');

exports.createPlant = (req, res) => {
    const data = req.body;
    plantModel.createPlant(data, (err, result) => {
        if (err) {
            console.error('Error creating plant:', err);
            return res.status(500).send('Error creating plant');
        }
        res.status(201).send(result);
    });
};

exports.getAllPlants = (req, res) => {
    plantModel.getAllPlants((err, results) => {
        if (err) {
            console.error('Error retrieving plants:', err);
            return res.status(500).send('Error retrieving plants');
        }
        res.send(results);
    });
};

exports.getPlantById = (req, res) => {
    plantModel.getPlantById(req.params.id, (err, result) => {
        if (err) {
            console.error('Error retrieving plant by ID:', err);
            return res.status(500).send('Error retrieving plant by ID');
        }
        if (result.length === 0) {
            return res.status(404).send('Plant not found');
        }
        res.send(result);
    });
};

exports.updatePlant = (req, res) => {
    const data = req.body;
    plantModel.updatePlant(req.params.id, data, (err, result) => {
        if (err) {
            console.error('Error updating plant:', err);
            return res.status(500).send('Error updating plant');
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Plant not found');
        }
        res.send(result);
    });
};

exports.deletePlant = (req, res) => {
    plantModel.deletePlant(req.params.id, (err, result) => {
        if (err) {
            console.error('Error deleting plant:', err);
            return res.status(500).send('Error deleting plant');
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Plant not found');
        }
        res.send(result);
    });
};
