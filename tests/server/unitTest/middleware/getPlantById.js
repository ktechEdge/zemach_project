
//checking single ID of a plant
const getPlantById = (id, callback) => {
    id=Number(id);
    const sql = `SELECT * FROM plant WHERE id = ${id}`;
    dbPool.query(sql,callback);
};


module.exports = getPlantById;