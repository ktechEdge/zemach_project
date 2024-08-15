const environmentalAvgMiddleware = require('../middleware/environmental_avg');

const getAllData = (callback) => {
    // Return all environmental data
    callback(null,environmentalData);
};

const getDataById = (id, callback) => {
    // Find data by ID from the global environmental data array
    const data = environmentalData.find(item => item.id === id);
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

    let newEntry = null;

    // Check if the device_id exists in the global environmental data array
    const existingDataIndex = environmentalData.findIndex(item => item.device_id === device_id);
    if (existingDataIndex !== -1) {
        // Get the last entry for this device_id
        const lastEntry = environmentalData[existingDataIndex];
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

        // Update the existing entry
        environmentalData[existingDataIndex] = {
            ...lastEntry,
            uv_radiation,
            uv_radiation_max: uv_radiation_max_val,
            uv_radiation_min: uv_radiation_min_val,
            light,
            light_max: light_max_val,
            light_min: light_min_val,
            air_temperature,
            air_temperature_max: air_temperature_max_val,
            air_temperature_min: air_temperature_min_val,
            air_humidity,
            air_humidity_max: air_humidity_max_val,
            air_humidity_min: air_humidity_min_val,
            soil_humidity,
            soil_humidity_max: soil_humidity_max_val,
            soil_humidity_min: soil_humidity_min_val,
            cnt,
            measurement_date,
            uv_radiation_sum,
            light_sum,
            air_temperature_sum,
            soil_humidity_sum,
            air_humidity_sum
        };
    } else {
        // Create a new entry with the updated values
        newEntry = {
            id: environmentalData.length + 1,
            device_id,
            uv_radiation,
            uv_radiation_max: uv_radiation_max_val,
            uv_radiation_min: uv_radiation_min_val,
            light,
            light_max: light_max_val,
            light_min: light_min_val,
            air_temperature,
            air_temperature_max: air_temperature_max_val,
            air_temperature_min: air_temperature_min_val,
            air_humidity,
            air_humidity_max: air_humidity_max_val,
            air_humidity_min: air_humidity_min_val,
            soil_humidity,
            soil_humidity_max: soil_humidity_max_val,
            soil_humidity_min: soil_humidity_min_val,
            plant_ID,
            cnt,
            measurement_date,
            uv_radiation_sum,
            light_sum,
            air_temperature_sum,
            soil_humidity_sum,
            air_humidity_sum
        };

        // Add the new entry to the global environmental data array
       environmentalData.push(newEntry);
    }

    // Check if 10 minutes have passed since the last measurement
    const now = new Date();
    const minutes = now.getMinutes();
    console.log(environmentalData);
    if (minutes % 2 === 0) {
        for (let i = 0; i < environmentalData.length; i++){
            // Create average environmental data and reset the array
            environmentalAvgMiddleware.createEnvironmentalAvgData(environmentalData[i]);
        }
        global.environmentalData = []; // Reset the array
        global.lastMeasurementTime = now; // Update the last measurement time
    }
    callback(null, device_id); // use device_id as callback argument
};

module.exports = {
    getAllData,
    getDataById,
    createData,
};
