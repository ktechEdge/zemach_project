
const createPlant = (data, callback) => {
    const sql = 'INSERT INTO plant SET ?';
    dbPool.query(sql, data, callback);
};

const getAllPlants = (callback) => {
    const sql = 'SELECT * FROM plant';
    dbPool.query(sql, callback);
};

const getPlantById = (id, callback) => {
    const sql = 'SELECT * FROM plant WHERE id = ?';
    dbPool.query(sql, [id], callback);
};

const updatePlant = (id, data, callback) => {
    const sql = 'UPDATE plant SET ? WHERE id = ?';
    dbPool.query(sql, [data, id], callback);
};

const deletePlant = (id, callback) => {
    const sql = 'DELETE FROM plant WHERE id = ?';
    dbPool.query(sql, [id], callback);
};

module.exports = {
    createPlant,
    getAllPlants,
    getPlantById,
    updatePlant,
    deletePlant
};
