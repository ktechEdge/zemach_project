async function getID(req, res, next) {
    let id = 2;
    let q = `SELECT * FROM test WHERE id = ?`;
    const promisePool = db_pool.promise();
    let rows = [];

    try {
        [rows] = await promisePool.query(q, [id]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "שגיאה בבסיס הנתונים" });
        return;
    }

    if (rows.length > 0) {
        res.jisOK = true;
        res.myQuery = rows[0];
    } else {
        res.jisOK = false;
    }

    next();
}

module.exports = { getID };