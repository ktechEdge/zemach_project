const getAllEnvironmentalAvgData = async () => {
    return new Promise((resolve, reject) => {
        dbPool.query('SELECT * FROM environmental_data_avg', (err, rows) => {
            if (err) return reject(err);
            resolve(rows);
        });
    });
};

const createEnvironmentalAvgData = async (data) => {
    const {
        device_id:device_id,
        UV_radiation: uv_radiation,
        UV_radiation_max: uv_radiation_max,
        UV_radiation_min: uv_radiation_min,
        lightIntensity: light,
        lightIntensity_max: light_max,
        lightIntensity_min: light_min,
        temperature: air_temperature,
        temperature_max: air_temperature_max,
        temperature_min: air_temperature_min,
        humidity: air_humidity,
        humidity_max: air_humidity_max,
        humidity_min: air_humidity_min,
        soilMoisture: soil_humidity,
        soilMoisture_max: soil_humidity_max,
        soilMoisture_min: soil_humidity_min,
        plant_ID,
        measurement_date
    } = data;

    console.log("Device ID:", device_id); // לוג לבדיקת הערך של device_id

    if (!device_id) {
        throw new Error('Missing device_id'); // תוסיף טיפול בשגיאה אם חסר device_id
    }

    return new Promise((resolve, reject) => {
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

        dbPool.query(query, avg, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};


module.exports = {
    getAllEnvironmentalAvgData,
    createEnvironmentalAvgData
};
