
const getAllData = (callback) => {
    dbPool.query('SELECT * FROM environmental_data', (err, rows) => {
        if (err) return callback(err);
        callback(null, rows);
    });
};

const getDataById = (id, callback) => {
    dbPool.query('SELECT * FROM environmental_data WHERE id = ?', [id], (err, rows) => {
        if (err) return callback(err);
        callback(null, rows[0]);
    });
};

const createData = (data, callback) => {
    const { device_id, uv_radiation, light, air_temperature, air_humidity, soil_humidity, measurement_date } = data;

    dbPool.query('SELECT * FROM environmental_data WHERE device_id = ? AND DATE(measurement_date) = DATE(?)', [device_id, measurement_date], (err, existingData) => {
        if (err) return callback(err);

        let sumFields = {
            uv_radiation: uv_radiation,
            light: light,
            air_temperature: air_temperature,
            air_humidity: air_humidity,
            soil_humidity: soil_humidity
        };

        let maxFields = {
            uv_radiation_max: uv_radiation,
            light_max: light,
            air_temperature_max: air_temperature,
            air_humidity_max: air_humidity,
            soil_humidity_max: soil_humidity
        };

        let minFields = {
            uv_radiation_min: uv_radiation,
            light_min: light,
            air_temperature_min: air_temperature,
            air_humidity_min: air_humidity,
            soil_humidity_min: soil_humidity
        };

        if (existingData.length > 0) {
            sumFields = {
                uv_radiation: existingData[0].uv_radiation + uv_radiation,
                light: existingData[0].light + light,
                air_temperature: existingData[0].air_temperature + air_temperature,
                air_humidity: existingData[0].air_humidity + air_humidity,
                soil_humidity: existingData[0].soil_humidity + soil_humidity
            };

            maxFields = {
                uv_radiation_max: Math.max(existingData[0].uv_radiation_max, uv_radiation),
                light_max: Math.max(existingData[0].light_max, light),
                air_temperature_max: Math.max(existingData[0].air_temperature_max, air_temperature),
                air_humidity_max: Math.max(existingData[0].air_humidity_max, air_humidity),
                soil_humidity_max: Math.max(existingData[0].soil_humidity_max, soil_humidity)
            };

            minFields = {
                uv_radiation_min: Math.min(existingData[0].uv_radiation_min, uv_radiation),
                light_min: Math.min(existingData[0].light_min, light),
                air_temperature_min: Math.min(existingData[0].air_temperature_min, air_temperature),
                air_humidity_min: Math.min(existingData[0].air_humidity_min, air_humidity),
                soil_humidity_min: Math.min(existingData[0].soil_humidity_min, soil_humidity)
            };

            dbPool.query('UPDATE environmental_data SET ? WHERE id = ?', [
                {
                    ...sumFields,
                    ...maxFields,
                    ...minFields,
                    cnt: existingData[0].cnt + 1
                },
                existingData[0].id
            ], (err) => {
                if (err) return callback(err);
                // בדיקה אם הדקה היא כפולה שלמה של 10
                const currentMinute = new Date(measurement_date).getMinutes();
                if (currentMinute % 10 === 0) {
                    calculateAndStoreAverages(device_id, callback);
                } else {
                    callback(null, true);
                }
            });
        } else {
            dbPool.query('INSERT INTO environmental_data SET ?', {
                device_id,
                ...sumFields,
                ...maxFields,
                ...minFields,
                cnt: 1,
                measurement_date
            }, (err, result) => {
                if (err) return callback(err);
                // בדיקה אם הדקה היא כפולה שלמה של 10
                const currentMinute = new Date(measurement_date).getMinutes();
                if (currentMinute % 10 === 0) {
                    calculateAndStoreAverages(device_id, callback);
                } else {
                    callback(null, result.insertId);
                }
            });
        }
    });
};

const calculateAndStoreAverages = (device_id, callback) => {
    dbPool.query('SELECT * FROM environmental_data WHERE device_id = ?', [device_id], (err, data) => {
        if (err) return callback(err);

        if (data.length > 0) {
            const averages = {
                uv_radiation_avg: data[0].uv_radiation / data[0].cnt,
                light_avg: data[0].light / data[0].cnt,
                air_temperature_avg: data[0].air_temperature / data[0].cnt,
                air_humidity_avg: data[0].air_humidity / data[0].cnt,
                soil_humidity_avg: data[0].soil_humidity / data[0].cnt,
            };

            const maxFields = {
                uv_radiation_max: data[0].uv_radiation_max,
                light_max: data[0].light_max,
                air_temperature_max: data[0].air_temperature_max,
                air_humidity_max: data[0].air_humidity_max,
                soil_humidity_max: data[0].soil_humidity_max
            };

            const minFields = {
                uv_radiation_min: data[0].uv_radiation_min,
                light_min: data[0].light_min,
                air_temperature_min: data[0].air_temperature_min,
                air_humidity_min: data[0].air_humidity_min,
                soil_humidity_min: data[0].soil_humidity_min
            };

            dbPool.query('INSERT INTO environmental_data_history SET ?', {
                device_id,
                ...averages,
                ...maxFields,
                ...minFields,
                measurement_date: new Date()
            }, (err) => {
                if (err) return callback(err);
                // איפוס הנתונים לאחר שמירת ההיסטוריה
                dbPool.query('UPDATE environmental_data SET uv_radiation = 0, light = 0, air_temperature = 0, air_humidity = 0, soil_humidity = 0, cnt = 0 WHERE device_id = ?', [device_id], (err) => {
                    if (err) return callback(err);
                    callback(null, true);
                });
            });
        } else {
            callback(null, true);
        }
    });
};

const updateData = (id, data, callback) => {
    const { device_id, uv_radiation, uv_radiation_max, uv_radiation_min, light, light_max, light_min, air_temperature, air_temperature_max, air_temperature_min, air_humidity, air_humidity_max, air_humidity_min, soil_humidity, soil_humidity_max, soil_humidity_min, plant_ID, cnt, measurement_date } = data;
    dbPool.query('UPDATE environmental_data SET device_id = ?, uv_radiation = ?, uv_radiation_max = ?, uv_radiation_min = ?, light = ?, light_max = ?, light_min = ?, air_temperature = ?, air_temperature_max = ?, air_temperature_min = ?, air_humidity = ?, air_humidity_max = ?, air_humidity_min = ?, soil_humidity = ?, soil_humidity_max = ?, soil_humidity_min = ?, plant_ID = ?, cnt = ?, measurement_date = ? WHERE id = ?', [device_id, uv_radiation, uv_radiation_max, uv_radiation_min, light, light_max, light_min, air_temperature, air_temperature_max, air_temperature_min, air_humidity, air_humidity_max, air_humidity_min, soil_humidity, soil_humidity_max, soil_humidity_min, plant_ID, cnt, measurement_date, id], callback);
};

const deleteData = (id, callback) => {
    dbPool.query('DELETE FROM environmental_data WHERE id = ?', [id], callback);
};

module.exports = {
    getAllData,
    getDataById,
    createData,
    updateData,
    deleteData
};
