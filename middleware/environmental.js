const environmentalAvgMiddleware = require('../middleware/environmental_avg');

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
    const {
        device_id, uv_radiation, uv_radiation_max, uv_radiation_min,
        light, light_max, light_min, air_temperature, air_temperature_max,
        air_temperature_min, air_humidity, air_humidity_max, air_humidity_min,
        soil_humidity, soil_humidity_max, soil_humidity_min, plant_ID
    } = data;

    const measurement_date = new Date(); // זמן עכשיו


    // Check if the device_id exists
    dbPool.query('SELECT * FROM environmental_data WHERE device_id = ?', [device_id], (err, result) => {
        if (err) return callback(err);

        let cnt = result.length > 0 ? result[result.length - 1].cnt + 1 : 1;
        let uv_radiation_sum = uv_radiation;
        let light_sum = light;
        let air_temperature_sum = air_temperature;
        let air_humidity_sum = air_humidity;
        let soil_humidity_sum = soil_humidity;

        // Default values for max and min fields
        let uv_radiation_max_val = uv_radiation;
        let uv_radiation_min_val = uv_radiation;
        let light_max_val = light;
        let light_min_val = light;
        let air_temperature_max_val = air_temperature;
        let air_temperature_min_val = air_temperature;
        let air_humidity_max_val = air_humidity;
        let air_humidity_min_val = air_humidity;
        let soil_humidity_max_val = soil_humidity;
        let soil_humidity_min_val = soil_humidity;

        if (result.length > 0) {
            const lastEntry = result[result.length - 1];

            uv_radiation_max_val = Math.max(lastEntry.uv_radiation_max, uv_radiation);
            uv_radiation_min_val = Math.min(lastEntry.uv_radiation_min, uv_radiation);
            light_max_val = Math.max(lastEntry.light_max, light);
            light_min_val = Math.min(lastEntry.light_min, light);
            air_temperature_max_val = Math.max(lastEntry.air_temperature_max, air_temperature);
            air_temperature_min_val = Math.min(lastEntry.air_temperature_min, air_temperature);
            air_humidity_max_val = Math.max(lastEntry.air_humidity_max, air_humidity);
            air_humidity_min_val = Math.min(lastEntry.air_humidity_min, air_humidity);
            soil_humidity_max_val = Math.max(lastEntry.soil_humidity_max, soil_humidity);
            soil_humidity_min_val = Math.min(lastEntry.soil_humidity_min, soil_humidity);

            uv_radiation_sum += lastEntry.uv_radiation_sum;
            light_sum += lastEntry.light_sum;
            air_temperature_sum += lastEntry.air_temperature_sum;
            air_humidity_sum += lastEntry.air_humidity_sum;
            soil_humidity_sum += lastEntry.soil_humidity_sum;
        }

        const values = [
            device_id, uv_radiation, uv_radiation_max_val, uv_radiation_min_val,
            light, light_max_val, light_min_val, air_temperature, air_temperature_max_val,
            air_temperature_min_val, air_humidity, air_humidity_max_val, air_humidity_min_val,
            soil_humidity, soil_humidity_max_val, soil_humidity_min_val, plant_ID, cnt,
            measurement_date, uv_radiation_sum, light_sum, air_temperature_sum,
            soil_humidity_sum, air_humidity_sum
        ];

        if (result.length > 0) {
            // Update existing record
            const updateQuery = `
                UPDATE environmental_data SET
                    uv_radiation = ?, uv_radiation_max = ?, uv_radiation_min = ?,
                    light = ?, light_max = ?, light_min = ?, air_temperature = ?, air_temperature_max = ?,
                    air_temperature_min = ?, air_humidity = ?, air_humidity_max = ?, air_humidity_min = ?,
                    soil_humidity = ?, soil_humidity_max = ?, soil_humidity_min = ?, plant_ID = ?,
                    cnt = ?, measurement_date = ?, uv_radiation_sum = ?, light_sum = ?, air_temperature_sum = ?,
                    soil_humidity_sum = ?, air_humidity_sum = ?
                WHERE device_id = ?
            `;

            const updateValues = [
                uv_radiation, uv_radiation_max_val, uv_radiation_min_val,
                light, light_max_val, light_min_val, air_temperature, air_temperature_max_val,
                air_temperature_min_val, air_humidity, air_humidity_max_val, air_humidity_min_val,
                soil_humidity, soil_humidity_max_val, soil_humidity_min_val, plant_ID, cnt,
                measurement_date, uv_radiation_sum, light_sum, air_temperature_sum,
                soil_humidity_sum, air_humidity_sum, device_id
            ];

            dbPool.query(updateQuery, updateValues, (err, result) => {
                if (err) return callback(err);
                callback(null, result.insertId);
            });
        } else {
            // Insert new record
            const insertQuery = `
                INSERT INTO environmental_data (
                    device_id, uv_radiation, uv_radiation_max, uv_radiation_min,
                    light, light_max, light_min, air_temperature, air_temperature_max,
                    air_temperature_min, air_humidity, air_humidity_max, air_humidity_min,
                    soil_humidity, soil_humidity_max, soil_humidity_min, plant_ID, cnt,
                    measurement_date, uv_radiation_sum, light_sum, air_temperature_sum,
                    soil_humidity_sum, air_humidity_sum
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;

            dbPool.query(insertQuery, values, (err, result) => {
                if (err) return callback(err);
                callback(null, result.insertId);
            });
        }
        console.log(cnt)
        if (cnt % 10 === 0) {
            environmentalAvgMiddleware.createEnvironmentalAvgData(data);
        }
    });
};

const updateData = (device_id, data, callback) => {
    const {
        uv_radiation, uv_radiation_max, uv_radiation_min,
        light, light_max, light_min, air_temperature, air_temperature_max,
        air_temperature_min, air_humidity, air_humidity_max, air_humidity_min,
        soil_humidity, soil_humidity_max, soil_humidity_min, plant_ID, cnt, measurement_date,
        uv_radiation_sum, light_sum, air_temperature_sum, soil_humidity_sum, air_humidity_sum
    } = data;

    const query = `
        UPDATE environmental_data SET
            uv_radiation = ?, uv_radiation_max = ?, uv_radiation_min = ?,
            light = ?, light_max = ?, light_min = ?, air_temperature = ?, air_temperature_max = ?,
            air_temperature_min = ?, air_humidity = ?, air_humidity_max = ?, air_humidity_min = ?,
            soil_humidity = ?, soil_humidity_max = ?, soil_humidity_min = ?, plant_ID = ?,
            cnt = ?, measurement_date = ?, uv_radiation_sum = ?, light_sum = ?, air_temperature_sum = ?,
            soil_humidity_sum = ?, air_humidity_sum = ?
        WHERE device_id = ?
    `;

    const values = [
        uv_radiation, uv_radiation_max, uv_radiation_min,
        light, light_max, light_min, air_temperature, air_temperature_max,
        air_temperature_min, air_humidity, air_humidity_max, air_humidity_min,
        soil_humidity, soil_humidity_max, soil_humidity_min, plant_ID,
        cnt, measurement_date, uv_radiation_sum, light_sum, air_temperature_sum,
        soil_humidity_sum, air_humidity_sum, device_id
    ];

    dbPool.query(query, values, callback);
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