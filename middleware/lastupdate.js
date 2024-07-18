const lastUpdateModel = require('../modules/lastupdate');

exports.createLastUpdate = (req, res) => {
    const data = req.body;
    lastUpdateModel.createLastUpdate(data, (err, result) => {
        if (err) {
            console.error('Error creating last update entry:', err);
            return res.status(500).send('Error creating last update entry');
        }
        res.status(201).send(result);
    });
};

exports.getAllLastUpdates = (req, res) => {
    lastUpdateModel.getAllLastUpdates((err, results) => {
        if (err) {
            console.error('Error retrieving last updates:', err);
            return res.status(500).send('Error retrieving last updates');
        }
        res.send(results);
    });
};

exports.getLastUpdateById = (req, res) => {
    lastUpdateModel.getLastUpdateById(req.params.id, (err, result) => {
        if (err) {
            console.error('Error retrieving last update entry by ID:', err);
            return res.status(500).send('Error retrieving last update entry by ID');
        }
        if (result.length === 0) {
            return res.status(404).send('Last update entry not found');
        }
        res.send(result);
    });
};

exports.updateLastUpdate = (req, res) => {
    const data = req.body;
    lastUpdateModel.updateLastUpdate(req.params.id, data, (err, result) => {
        if (err) {
            console.error('Error updating last update entry:', err);
            return res.status(500).send('Error updating last update entry');
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Last update entry not found');
        }
        res.send(result);
    });
};

exports.deleteLastUpdate = (req, res) => {
    lastUpdateModel.deleteLastUpdate(req.params.id, (err, result) => {
        if (err) {
            console.error('Error deleting last update entry:', err);
            return res.status(500).send('Error deleting last update entry');
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Last update entry not found');
        }
        res.send(result);
    });
};
