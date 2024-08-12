
const createArduino = (data, callback) => {
    const sql = 'INSERT INTO arduino SET ?';
    dbPool.query(sql, data, callback);
};

const getAllArduinos = (callback) => {
    const sql = 'SELECT * FROM arduino';
    dbPool.query(sql, callback);
};

const getArduinoById = (id, callback) => {
    const sql = 'SELECT * FROM arduino WHERE id = ?';
    dbPool.query(sql, [id], callback);
};

const updateArduino = (id, data, callback) => {
    const sql = 'UPDATE arduino SET ? WHERE id = ?';
    dbPool.query(sql, [data, id], callback);
};

const deleteArduino = (id, callback) => {
    const sql = 'DELETE FROM arduino WHERE id = ?';
    dbPool.query(sql, [id], callback);
};

module.exports = {
    createArduino,
    getAllArduinos,
    getArduinoById,
    updateArduino,
    deleteArduino
};
