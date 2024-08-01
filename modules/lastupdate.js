
const createLastUpdate = (data, callback) => {
    const sql = 'INSERT INTO lastupdate SET ?';
    dbPool.query(sql, data, callback);
};

const getAllLastUpdates = (callback) => {
    const sql = 'SELECT * FROM lastupdate';
    dbPool.query(sql, callback);
};

const getLastUpdateById = (id, callback) => {
    const sql = 'SELECT * FROM lastupdate WHERE id = ?';
    dbPool.query(sql, [id], callback);
};

const updateLastUpdate = (id, data, callback) => {
    const sql = 'UPDATE lastupdate SET ? WHERE id = ?';
    dbPool.query(sql, [data, id], callback);
};

const deleteLastUpdate = (id, callback) => {
    const sql = 'DELETE FROM lastupdate WHERE id = ?';
    dbPool.query(sql, [id], callback);
};

module.exports = {
    createLastUpdate,
    getAllLastUpdates,
    getLastUpdateById,
    updateLastUpdate,
    deleteLastUpdate
};
