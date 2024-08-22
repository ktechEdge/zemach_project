
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
        device_id,
        UV_radiation: uv_radiation,
        UV_radiation_max: uv_radiation_max,
        UV_radiation_min: uv_radiation_min,
        lightIntensity: light,                    // Renamed
        lightIntensity_max: light_max,            // Renamed
        lightIntensity_min: light_min,            // Renamed
        temperature: air_temperature,             // Renamed
        temperature_max: air_temperature_max,     // Renamed
        temperature_min: air_temperature_min,     // Renamed
        humidity: air_humidity,                   // Renamed
        humidity_max: air_humidity_max,           // Renamed
        humidity_min: air_humidity_min,           // Renamed
        soilMoisture: soil_humidity,              // Renamed
        soilMoisture_max: soil_humidity_max,      // Renamed
        soilMoisture_min: soil_humidity_min,      // Renamed
        plant_ID,
        measurement_date
    } = data;

    // Log data to ensure it's being passed correctly
    console.log("Data being passed for insertion:", {
        device_id, uv_radiation, uv_radiation_max, uv_radiation_min,
        light, light_max, light_min, air_temperature, air_temperature_max,
        air_temperature_min, air_humidity, air_humidity_max, air_humidity_min,
        soil_humidity, soil_humidity_max, soil_humidity_min, plant_ID,
        measurement_date
    });

    // Ensure values are not null before inserting
    if (
        device_id && plant_ID &&
        uv_radiation !== null && light !== null && air_temperature !== null &&
        air_humidity !== null && soil_humidity !== null
    ) {
        const avg = [
            device_id, uv_radiation, uv_radiation_max, uv_radiation_min,
            light, light_max, light_min, air_temperature, air_temperature_max,
            air_temperature_min, air_humidity, air_humidity_max, air_humidity_min,
            soil_humidity, soil_humidity_max, soil_humidity_min, plant_ID,
            measurement_date
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
    } else {
        callback(new Error('Data validation failed, some values are null or missing'), null);
    }
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
