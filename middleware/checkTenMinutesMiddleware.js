const moment = require('moment');

const checkTenMinutesMiddleware = async (req, res, next) => {
    const result = await query('SELECT * FROM environmental_data ORDER BY measurement_date DESC LIMIT 1');
    if (result.length > 0) {
        const lastMeasurementDate = result[0].measurement_date;
        if (hasTenMinutesPassed(lastMeasurementDate)) {
            req.body.measurement_date = moment().toISOString();
        }
    } else {
        req.body.measurement_date = moment().toISOString();
    }
    next();
};

const hasTenMinutesPassed = (lastMeasurementDate) => {
    const now = moment();
    const measurementMoment = moment(lastMeasurementDate);
    const difference = now.diff(measurementMoment, 'minutes');
    return difference >= 10;
};

const query = (queryString, params = []) => {
    return new Promise((resolve, reject) => {
        dbPool.query(queryString, params, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

module.exports = checkTenMinutesMiddleware;
