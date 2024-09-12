

const getPlantById = (db, id, callback) => {
    const plantid = Number(id);
    const sql = `SELECT * FROM plant WHERE id = ${plantid}`;
    db.query(sql, (error, result) => {
        callback(error, result);
    });
};

module.exports = getPlantById;