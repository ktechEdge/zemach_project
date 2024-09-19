const getAllEnvironmentalAvgData = async () => {
    try {
        const [rows] = await dbPool.query('SELECT * FROM environmental_data_avg');
        return rows;
    } catch (err) {
        throw new Error(`Error fetching environmental average data: ${err.message}`);
    }
};

const createEnvironmentalAvgData = async (data) => {
    const {
        device_id,
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

    console.log("Device ID:", device_id); // Log for checking device_id value

    if (!device_id) {
        throw new Error('Missing device_id');
    }

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

    try {
        const [result] = await dbPool.query(query, avg);
        return result;
    } catch (err) {
        throw new Error(`Error inserting environmental average data: ${err.message}`);
    }
};

module.exports = {
    getAllEnvironmentalAvgData,
    createEnvironmentalAvgData
};
