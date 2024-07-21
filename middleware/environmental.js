

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
        soil_humidity, soil_humidity_max, soil_humidity_min, plant_ID, measurement_date
    } = data;


    // Check for the current cnt value
    dbPool.query('SELECT * FROM environmental_data', (err, result) => {
        if (err) return callback(err);

        let cnt = result.length; // Default cnt value
        cnt ++; // Increment cnt value

        const query = `
            INSERT INTO environmental_data (
                device_id, uv_radiation, uv_radiation_max, uv_radiation_min,
                light, light_max, light_min, air_temperature, air_temperature_max,
                air_temperature_min, air_humidity, air_humidity_max, air_humidity_min,
                soil_humidity, soil_humidity_max, soil_humidity_min, plant_ID, cnt,
                measurement_date
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
            device_id, uv_radiation, uv_radiation_max, uv_radiation_min,
            light, light_max, light_min, air_temperature, air_temperature_max,
            air_temperature_min, air_humidity, air_humidity_max, air_humidity_min,
            soil_humidity, soil_humidity_max, soil_humidity_min, plant_ID, cnt, measurement_date
        ];

        dbPool.query(query, values, (err, result) => {
            if (err) return callback(err);
            callback(null, result.insertId);
        });
    });
};

const updateData = (id, data, callback) => {
    const {
        device_id, uv_radiation, uv_radiation_max, uv_radiation_min,
        light, light_max, light_min, air_temperature, air_temperature_max,
        air_temperature_min, air_humidity, air_humidity_max, air_humidity_min,
        soil_humidity, soil_humidity_max, soil_humidity_min, plant_ID, cnt, measurement_date
    } = data;

    const query = `
        UPDATE environmental_data SET
            device_id = ?, uv_radiation = ?, uv_radiation_max = ?, uv_radiation_min = ?,
            light = ?, light_max = ?, light_min = ?, air_temperature = ?, air_temperature_max = ?,
            air_temperature_min = ?, air_humidity = ?, air_humidity_max = ?, air_humidity_min = ?,
            soil_humidity = ?, soil_humidity_max = ?, soil_humidity_min = ?, plant_ID = ?,
            cnt = ?, measurement_date = ?
        WHERE id = ?
    `;
    const values = [
        device_id, uv_radiation, uv_radiation_max, uv_radiation_min,
        light, light_max, light_min, air_temperature, air_temperature_max,
        air_temperature_min, air_humidity, air_humidity_max, air_humidity_min,
        soil_humidity, soil_humidity_max, soil_humidity_min, plant_ID, cnt, measurement_date, id
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
