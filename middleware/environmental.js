const environmentalAvgMiddleware = require('../middleware/environmental_avg');

const getAllData = (callback) => {
    console.log("Environmental Data:", environmentalData); // Log to check the array
    callback(null, environmentalData);
};

const getDataById = (id, callback) => {
    // Find data by ID from the global environmental data array
    const data = environmentalData.find(item => item.id === id);
    callback(null, data);
};

const createData = (data, callback) => {
    const { id, Status } = data;  // Getting the ID and Status from the incoming data

    // Loop through the positions (arrays of environmental data)
    data.positions.forEach(position => {
        const { temperature, humidity, lightIntensity, UV_radiation, soilMoisture } = position;

        // Validate the incoming data - check if the values are numbers
        if (typeof UV_radiation !== 'number' || typeof lightIntensity !== 'number' ||
            typeof temperature !== 'number' || typeof humidity !== 'number' ||
            typeof soilMoisture !== 'number') {
            callback(new Error('Invalid data type'), null);
            return;
        }

        const measurement_date = new Date(); // Current time

        let cnt = 1;
        let UV_radiation_sum = UV_radiation;
        let lightIntensity_sum = lightIntensity;
        let temperature_sum = temperature;
        let humidity_sum = humidity;
        let soilMoisture_sum = soilMoisture;

        let UV_radiation_max_val = UV_radiation;
        let UV_radiation_min_val = UV_radiation;
        let lightIntensity_max_val = lightIntensity;
        let lightIntensity_min_val = lightIntensity;
        let temperature_max_val = temperature;
        let temperature_min_val = temperature;
        let humidity_max_val = humidity;
        let humidity_min_val = humidity;
        let soilMoisture_max_val = soilMoisture;
        let soilMoisture_min_val = soilMoisture;

        let newEntry = null;

        // Check if the device_id exists in the global environmental data array
        const existingDataIndex = environmentalData.findIndex(item => item.device_id === id);
        if (existingDataIndex !== -1) {
            // Get the last entry for this device_id
            const lastEntry = environmentalData[existingDataIndex];
            cnt = lastEntry.cnt + 1;

            // Update max and min values
            UV_radiation_max_val = Math.max(lastEntry.UV_radiation_max, UV_radiation);
            UV_radiation_min_val = Math.min(lastEntry.UV_radiation_min, UV_radiation);
            lightIntensity_max_val = Math.max(lastEntry.lightIntensity_max, lightIntensity);
            lightIntensity_min_val = Math.min(lastEntry.lightIntensity_min, lightIntensity);
            temperature_max_val = Math.max(lastEntry.temperature_max, temperature);
            temperature_min_val = Math.min(lastEntry.temperature_min, temperature);
            humidity_max_val = Math.max(lastEntry.humidity_max, humidity);
            humidity_min_val = Math.min(lastEntry.humidity_min, humidity);
            soilMoisture_max_val = Math.max(lastEntry.soilMoisture_max, soilMoisture);
            soilMoisture_min_val = Math.min(lastEntry.soilMoisture_min, soilMoisture);

            // Update sum values
            UV_radiation_sum += lastEntry.UV_radiation_sum;
            lightIntensity_sum += lastEntry.lightIntensity_sum;
            temperature_sum += lastEntry.temperature_sum;
            humidity_sum += lastEntry.humidity_sum;
            soilMoisture_sum += lastEntry.soilMoisture_sum;

            // Update the existing entry
            environmentalData[existingDataIndex] = {
                ...lastEntry,
                UV_radiation,
                UV_radiation_max: UV_radiation_max_val,
                UV_radiation_min: UV_radiation_min_val,
                lightIntensity,
                lightIntensity_max: lightIntensity_max_val,
                lightIntensity_min: lightIntensity_min_val,
                temperature,
                temperature_max: temperature_max_val,
                temperature_min: temperature_min_val,
                humidity,
                humidity_max: humidity_max_val,
                humidity_min: humidity_min_val,
                soilMoisture,
                soilMoisture_max: soilMoisture_max_val,
                soilMoisture_min: soilMoisture_min_val,
                cnt,
                measurement_date,
                UV_radiation_sum,
                lightIntensity_sum,
                temperature_sum,
                soilMoisture_sum,
                humidity_sum
            };
        } else {
            // Create a new entry with the updated values
            newEntry = {
                id: environmentalData.length + 1,
                device_id: id,
                UV_radiation,
                UV_radiation_max: UV_radiation_max_val,
                UV_radiation_min: UV_radiation_min_val,
                lightIntensity,
                lightIntensity_max: lightIntensity_max_val,
                lightIntensity_min: lightIntensity_min_val,
                temperature,
                temperature_max: temperature_max_val,
                temperature_min: temperature_min_val,
                humidity,
                humidity_max: humidity_max_val,
                humidity_min: humidity_min_val,
                soilMoisture,
                soilMoisture_max: soilMoisture_max_val,
                soilMoisture_min: soilMoisture_min_val,
                plant_ID: data.plant_ID, // Keep plant_ID if present
                cnt,
                measurement_date,
                UV_radiation_sum,
                lightIntensity_sum,
                temperature_sum,
                soilMoisture_sum,
                humidity_sum
            };

            // Add the new entry to the global environmental data array
            environmentalData.push(newEntry);
        }
    });

    // Check if 10 minutes have passed since the last measurement
    const now = new Date();
    const minutes = now.getMinutes();
    if (minutes % 10 === 0) {
        for (let i = 0; i < environmentalData.length; i++) {
            // Create average environmental data and reset the array
            environmentalAvgMiddleware.createEnvironmentalAvgData(environmentalData[i]);
        }
        global.environmentalData = []; // Reset the array
        global.lastMeasurementTime = now; // Update the last measurement time
    }
    callback(null, id); // use device_id as callback argument
};

module.exports = {
    getAllData,
    getDataById,
    createData,
};
