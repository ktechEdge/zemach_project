
const createEnvironmentalAvgData = (data, callback) => {
    const sql = 'INSERT INTO environmental_data_avg SET ?';
    dbPool.query(sql, data, callback);
};

const getAllEnvironmentalAvgData = (callback) => {
    const sql = 'SELECT * FROM environmental_data_avg';
    dbPool.query(sql, callback);
};

const getEnvironmentalAvgDataById = (id, callback) => {
    const sql = 'SELECT * FROM environmental_data_avg WHERE id = ?';
    dbPool.query(sql, [id], callback);
};

const updateEnvironmentalAvgData = (id, data, callback) => {
    const sql = 'UPDATE environmental_data_avg SET ? WHERE id = ?';
    dbPool.query(sql, [data, id], callback);
};

const deleteEnvironmentalAvgData = (id, callback) => {
    const sql = 'DELETE FROM environmental_data_avg WHERE id = ?';
    dbPool.query(sql, [id], callback);
};

module.exports = {
    createEnvironmentalAvgData,
    getAllEnvironmentalAvgData,
    getEnvironmentalAvgDataById,
    updateEnvironmentalAvgData,
    deleteEnvironmentalAvgData
};
