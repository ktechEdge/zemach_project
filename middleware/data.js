const GetData = (startDate, endDate) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM environmental_data_avg WHERE measurement_date BETWEEN ? AND ?';
        const params = [startDate, endDate];

        dbPool.query(query, params, (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                reject(new Error('An error occurred while fetching data'));
            } else {
                resolve(results);
            }
        });
    });
};

module.exports = {
    GetData:GetData
};