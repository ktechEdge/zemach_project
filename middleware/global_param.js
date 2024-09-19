const globalParamModel = require('../modules/global_param');

exports.createGlobalParam = (req, res) => {
    const data = req.body;
    globalParamModel.createGlobalParam(data, (err, result) => {
        if (err) {
            console.error('Error creating global parameter:', err);
            return res.status(500).send('Error creating global parameter');
        }
        res.status(201).send(result);
    });
};

exports.getAllGlobalParams = (req, res) => {
    globalParamModel.getAllGlobalParams((err, results) => {
        if (err) {
            console.error('Error retrieving global parameters:', err);
            return res.status(500).send('Error retrieving global parameters');
        }
        res.send(results);
    });
};

exports.getGlobalParamById = (req, res) => {
    globalParamModel.getGlobalParamById(req.params.id, (err, result) => {
        if (err) {
            console.error('Error retrieving global parameter by ID:', err);
            return res.status(500).send('Error retrieving global parameter by ID');
        }
        if (result.length === 0) {
            return res.status(404).send('Global parameter not found');
        }
        res.send(result);
    });
};

exports.updateGlobalParam = (req, res) => {
    const data = req.body;
    globalParamModel.updateGlobalParam(req.params.id, data, (err, result) => {
        if (err) {
            console.error('Error updating global parameter:', err);
            return res.status(500).send('Error updating global parameter');
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Global parameter not found');
        }
        res.send(result);
    });
};

exports.deleteGlobalParam = (req, res) => {
    globalParamModel.deleteGlobalParam(req.params.id, (err, result) => {
        if (err) {
            console.error('Error deleting global parameter:', err);
            return res.status(500).send('Error deleting global parameter');
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Global parameter not found');
        }
        res.send(result);
    });
};
