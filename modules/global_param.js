
const createGlobalParam = (data, callback) => {
    const sql = 'INSERT INTO global_param SET ?';
    dbPool.query(sql, data, callback);
};

const getAllGlobalParams = (callback) => {
    const sql = 'SELECT * FROM global_param';
    dbPool.query(sql, callback);
};

const getGlobalParamById = (id, callback) => {
    const sql = 'SELECT * FROM global_param WHERE id = ?';
    dbPool.query(sql, [id], callback);
};

const updateGlobalParam = (id, data, callback) => {
    const sql = 'UPDATE global_param SET ? WHERE id = ?';
    dbPool.query(sql, [data, id], callback);
};

const deleteGlobalParam = (id, callback) => {
    const sql = 'DELETE FROM global_param WHERE id = ?';
    dbPool.query(sql, [id], callback);
};

module.exports = {
    createGlobalParam,
    getAllGlobalParams,
    getGlobalParamById,
    updateGlobalParam,
    deleteGlobalParam
};
