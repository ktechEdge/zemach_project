const environmentalAvgMiddleware = require('../middleware/environmental_avg');

const getAllData = (callback) => {
    // Return all environmental data
    callback(null, global.environmentalData);
};

const getDataById = (id, callback) => {
    // Find data by ID from the global environmental data array
    const data = global.environmentalData.find(item => item.id === id);
    callback(null, data);
};

const createData = (data, callback) => {
    const {
        device_id, uv_radiation, light, air_temperature, air_humidity, soil_humidity, plant_ID
    } = data;

    const measurement_date = new Date(); // Current time

    let cnt = 1;
    let uv_radiation_sum = uv_radiation;
    let light_sum = light;
    let air_temperature_sum = air_temperature;
    let air_humidity_sum = air_humidity;
    let soil_humidity_sum = soil_humidity;

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

    // Check if the device_id exists in the global environmental data array
    const existingData = global.environmentalData.filter(item => item.device_id === device_id);
    if (existingData.length > 0) {
        // Get the last entry for this device_id
        const lastEntry = existingData[existingData.length - 1];
        cnt = lastEntry.cnt + 1;

        // Update max and min values
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

        // Update sum values
        uv_radiation_sum += lastEntry.uv_radiation_sum;
        light_sum += lastEntry.light_sum;
        air_temperature_sum += lastEntry.air_temperature_sum;
        air_humidity_sum += lastEntry.air_humidity_sum;
        soil_humidity_sum += lastEntry.soil_humidity_sum;
    }

    // Create a new entry with the updated values
    const newEntry = {
        id: global.environmentalData.length + 1,
        device_id, uv_radiation, uv_radiation_max: uv_radiation_max_val, uv_radiation_min: uv_radiation_min_val,
        light, light_max: light_max_val, light_min: light_min_val, air_temperature, air_temperature_max: air_temperature_max_val,
        air_temperature_min: air_temperature_min_val, air_humidity, air_humidity_max: air_humidity_max_val, air_humidity_min: air_humidity_min_val,
        soil_humidity, soil_humidity_max: soil_humidity_max_val, soil_humidity_min: soil_humidity_min_val, plant_ID, cnt,
        measurement_date, uv_radiation_sum, light_sum, air_temperature_sum, soil_humidity_sum, air_humidity_sum
    };

    // Add the new entry to the global environmental data array
    global.environmentalData.push(newEntry);

    // Check if 10 minutes have passed since the last measurement
    const tenMinutes = 10 * 60 * 1000;
    const now = new Date();
    console.log(global.environmentalData);
    if (global.lastMeasurementTime === null || (now - global.lastMeasurementTime) >= tenMinutes) {
        // Create average environmental data and reset the array
        environmentalAvgMiddleware.createEnvironmentalAvgData(newEntry);
        global.environmentalData = []; // Reset the array
        global.lastMeasurementTime = now; // Update the last measurement time
    }
    callback(null, newEntry.id);
};

module.exports = {
    getAllData,
    getDataById,
    createData,
};
