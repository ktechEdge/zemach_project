const GetData = async (req, res, next) => {
    try {
        //const { startDate = '2024-08-25', endDate = '2024-11-25 23:59:59' } = req.query;
        //default values for the query variables
        const { startDate, endDate } = req.body;
        const query = `SELECT * FROM environmental_data_avg WHERE measurement_date BETWEEN '${startDate}' AND '${endDate}'`;

        const promisePool = dbPool.promise();

        try {
            const [result] = await promisePool.query(query);
            req.result = result;
        } catch (err) {
            console.error('Error executing query:', err);
            req.error = new Error('An error occurred while fetching data');
        }

        next();
    } catch (error) {
        console.error('Unexpected error:', error);
        req.error = new Error('Unexpected error occurred');
        next();
    }
};

module.exports = {
    GetData:GetData
};
