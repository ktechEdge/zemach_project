const environmentalAvgModel = require('../modules/environmental_avg');

exports.createEnvironmentalAvgData = (req, res) => {
    const data = req.body;
    environmentalAvgModel.createEnvironmentalAvgData(data, (err, result) => {
        if (err) {
            console.error('Error creating environmental average data:', err);
            return res.status(500).send('Error creating environmental average data');
        }
        res.status(201).send(result);
    });
};

exports.getAllEnvironmentalAvgData = (req, res) => {
    environmentalAvgModel.getAllEnvironmentalAvgData((err, results) => {
        if (err) {
            console.error('Error retrieving environmental average data:', err);
            return res.status(500).send('Error retrieving environmental average data');
        }
        res.send(results);
    });
};

exports.getEnvironmentalAvgDataById = (req, res) => {
    environmentalAvgModel.getEnvironmentalAvgDataById(req.params.id, (err, result) => {
        if (err) {
            console.error('Error retrieving environmental average data by ID:', err);
            return res.status(500).send('Error retrieving environmental average data by ID');
        }
        if (result.length === 0) {
            return res.status(404).send('Environmental average data not found');
        }
        res.send(result);
    });
};

exports.updateEnvironmentalAvgData = (req, res) => {
    const data = req.body;
    environmentalAvgModel.updateEnvironmentalAvgData(req.params.id, data, (err, result) => {
        if (err) {
            console.error('Error updating environmental average data:', err);
            return res.status(500).send('Error updating environmental average data');
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Environmental average data not found');
        }
        res.send(result);
    });
};

exports.deleteEnvironmentalAvgData = (req, res) => {
    environmentalAvgModel.deleteEnvironmentalAvgData(req.params.id, (err, result) => {
        if (err) {
            console.error('Error deleting environmental average data:', err);
            return res.status(500).send('Error deleting environmental average data');
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Environmental average data not found');
        }
        res.send(result);
    });
};
