// modules/environmental.js

const createEnvironmentalData = (data, callback) => {
    const sql = 'INSERT INTO environmental_data SET ?';
    dbPool.query(sql, data, callback);
};

const getAllEnvironmentalData = (callback) => {
    const sql = 'SELECT * FROM environmental_data';
    dbPool.query(sql, callback);
};

const getEnvironmentalDataById = (id, callback) => {
    const sql = 'SELECT * FROM environmental_data WHERE id = ?';
    dbPool.query(sql, [id], callback);
};

const updateEnvironmentalData = (id, data, callback) => {
    const sql = 'UPDATE environmental_data SET ? WHERE id = ?';
    dbPool.query(sql, [data, id], callback);
};

const deleteEnvironmentalData = (id, callback) => {
    const sql = 'DELETE FROM environmental_data WHERE id = ?';
    dbPool.query(sql, [id], callback);
};

module.exports = {
    createEnvironmentalData,
    getAllEnvironmentalData,
    getEnvironmentalDataById,
    updateEnvironmentalData,
    deleteEnvironmentalData
};
