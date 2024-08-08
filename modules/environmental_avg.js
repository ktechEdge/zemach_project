
const getAllEnvironmentalAvgData = (callback) => {
    dbPool.query('SELECT * FROM environmental_data_avg', (err, rows) => {
        if (err) return callback(err);
        callback(null, rows);
    });
};

const getEnvironmentalAvgDataById = (id, callback) => {
    dbPool.query('SELECT * FROM environmental_data_avg WHERE id = ?', [id], (err, rows) => {
        if (err) return callback(err);
        callback(null, rows[0]);
    });
};

const createEnvironmentalAvgData = (data, callback) => {
    const {
        device_id, uv_radiation, uv_radiation_max, uv_radiation_min,
        light, light_max, light_min, air_temperature, air_temperature_max,
        air_temperature_min, air_humidity, air_humidity_max, air_humidity_min,
        soil_humidity, soil_humidity_max, soil_humidity_min, plant_ID
    } = data;
    const measurement_date = new Date(); // זמן עכשיו


    const avg = [
        device_id, uv_radiation, uv_radiation_max, uv_radiation_min,
        light, light_max, light_min, air_temperature, air_temperature_max,
        air_temperature_min, air_humidity, air_humidity_max, air_humidity_min,
        soil_humidity, soil_humidity_max, soil_humidity_min, plant_ID, measurement_date
    ];

    const query = `
        INSERT INTO environmental_data_avg (
            device_id, uv_radiation, uv_radiation_max, uv_radiation_min,
            light, light_max, light_min, air_temperature, air_temperature_max,
            air_temperature_min, air_humidity, air_humidity_max, air_humidity_min,
            soil_humidity, soil_humidity_max, soil_humidity_min, plant_ID,
            measurement_date
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    dbPool.query(query, avg, callback);
};

const updateEnvironmentalAvgData = (id, data, callback) => {
    const {
        device_id, uv_radiation, uv_radiation_max, uv_radiation_min,
        light, light_max, light_min, air_temperature, air_temperature_max,
        air_temperature_min, air_humidity, air_humidity_max, air_humidity_min,
        soil_humidity, soil_humidity_max, soil_humidity_min, plant_ID, measurement_date
    } = data;


    const avg = [
        device_id, uv_radiation, uv_radiation_max, uv_radiation_min,
        light, light_max, light_min, air_temperature, air_temperature_max,
        air_temperature_min, air_humidity, air_humidity_max, air_humidity_min,
        soil_humidity, soil_humidity_max, soil_humidity_min, plant_ID, measurement_date, id
    ];

    const query = `
        UPDATE environmental_data_avg SET
            device_id = ?, uv_radiation = ?, uv_radiation_max = ?, uv_radiation_min = ?,
            light = ?, light_max = ?, light_min = ?, air_temperature = ?, air_temperature_max = ?,
            air_temperature_min = ?, air_humidity = ?, air_humidity_max = ?, air_humidity_min = ?,
            soil_humidity = ?, soil_humidity_max = ?, soil_humidity_min = ?, plant_ID = ?,
            measurement_date = ?
        WHERE id = ?
    `;

    dbPool.query(query, avg, callback);
};

const deleteEnvironmentalAvgData = (id, callback) => {
    const sql = 'DELETE FROM environmental_data_avg WHERE id = ?';
    dbPool.query(sql, [id], callback);
};

module.exports = {
    getAllEnvironmentalAvgData,
    getEnvironmentalAvgDataById,
    createEnvironmentalAvgData,
    updateEnvironmentalAvgData,
    deleteEnvironmentalAvgData
};
