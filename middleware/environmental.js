// middleware/environmental.js
const environmentalModel = require('../modules/environmental');

exports.createEnvironmentalData = (req, res) => {
    const data = req.body;
    environmentalModel.createEnvironmentalData(data, (err, result) => {
        if (err) {
            console.error('Error creating environmental data:', err);
            return res.status(500).send('Error creating environmental data');
        }
        res.status(201).send(result);
    });
};

exports.getAllEnvironmentalData = (req, res) => {
    environmentalModel.getAllEnvironmentalData((err, results) => {
        if (err) {
            console.error('Error retrieving environmental data:', err);
            return res.status(500).send('Error retrieving environmental data');
        }
        res.send(results);
    });
};

exports.getEnvironmentalDataById = (req, res) => {
    environmentalModel.getEnvironmentalDataById(req.params.id, (err, result) => {
        if (err) {
            console.error('Error retrieving environmental data:', err);
            return res.status(500).send('Error retrieving environmental data');
        }
        if (result.length === 0) {
            return res.status(404).send('Environmental data not found');
        }
        res.send(result);
    });
};

exports.updateEnvironmentalData = (req, res) => {
    const data = req.body;
    environmentalModel.updateEnvironmentalData(req.params.id, data, (err, result) => {
        if (err) {
            console.error('Error updating environmental data:', err);
            return res.status(500).send('Error updating environmental data');
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Environmental data not found');
        }
        res.send(result);
    });
};

exports.deleteEnvironmentalData = (req, res) => {
    environmentalModel.deleteEnvironmentalData(req.params.id, (err, result) => {
        if (err) {
            console.error('Error deleting environmental data:', err);
            return res.status(500).send('Error deleting environmental data');
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Environmental data not found');
        }
        res.send(result);
    });
};
