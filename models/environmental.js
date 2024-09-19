const { createEnvironmentalAvgData } = require("../middleware/environmental_avg");

// Class representing environmental data for a plant and managing updates
class EnvironmentalData {
    // Initializes data for a plant, setting initial values for environmental factors
    constructor(id, plant_ID, temperature, humidity, lightIntensity, UV_radiation, soilMoisture) {
        this.id = id;
        this.plant_ID = plant_ID;
        this.temperature = temperature;
        this.humidity = humidity;
        this.lightIntensity = lightIntensity;
        this.UV_radiation = UV_radiation;
        this.soilMoisture = soilMoisture;

        // Set initial sum, min, and max values for each factor
        this.cnt = 1;
        this.UV_radiation_sum = UV_radiation;
        this.lightIntensity_sum = lightIntensity;
        this.temperature_sum = temperature;
        this.humidity_sum = humidity;
        this.soilMoisture_sum = soilMoisture;

        this.UV_radiation_max = UV_radiation;
        this.UV_radiation_min = UV_radiation;
        this.lightIntensity_max = lightIntensity;
        this.lightIntensity_min = lightIntensity;
        this.temperature_max = temperature;
        this.temperature_min = temperature;
        this.humidity_max = humidity;
        this.humidity_min = humidity;
        this.soilMoisture_max = soilMoisture;
        this.soilMoisture_min = soilMoisture;

        this.measurement_date = new Date();
    }

    // Updates the data with new measurements, adjusting sums, counts, and min/max values
    update(newData) {
        this.cnt += 1;
        this.UV_radiation_sum += newData.UV_radiation;
        this.lightIntensity_sum += newData.lightIntensity;
        this.temperature_sum += newData.temperature;
        this.humidity_sum += newData.humidity;
        this.soilMoisture_sum += newData.soilMoisture;

        this.UV_radiation_max = Math.max(this.UV_radiation_max, newData.UV_radiation);
        this.UV_radiation_min = Math.min(this.UV_radiation_min, newData.UV_radiation);
        this.lightIntensity_max = Math.max(this.lightIntensity_max, newData.lightIntensity);
        this.lightIntensity_min = Math.min(this.lightIntensity_min, newData.lightIntensity);
        this.temperature_max = Math.max(this.temperature_max, newData.temperature);
        this.temperature_min = Math.min(this.temperature_min, newData.temperature);
        this.humidity_max = Math.max(this.humidity_max, newData.humidity);
        this.humidity_min = Math.min(this.humidity_min, newData.humidity);
        this.soilMoisture_max = Math.max(this.soilMoisture_max, newData.soilMoisture);
        this.soilMoisture_min = Math.min(this.soilMoisture_min, newData.soilMoisture);

        this.measurement_date = new Date();
    }

    // Calculates and returns the average values for each factor
    getAverage() {
        return {
            UV_radiation_avg: this.UV_radiation_sum / this.cnt,
            lightIntensity_avg: this.lightIntensity_sum / this.cnt,
            temperature_avg: this.temperature_sum / this.cnt,
            humidity_avg: this.humidity_sum / this.cnt,
            soilMoisture_avg: this.soilMoisture_sum / this.cnt,
        };
    }
}

// Manager class to handle multiple environmental data entries and average calculations
class EnvironmentalDataManager {
    constructor() {
        this.data = [];
        this.lastMeasurementTime = new Date();
    }

    // Fetches all stored data
    async getAllData() {
        console.log("----------------------Environmental Data:", this.data);
        return this.data;
    }

    // Retrieves specific data by its ID
    async getDataById(id) {
        const data = this.data.find(item => item.id === id);
        return data;
    }

    // Adds new data, or updates existing data for the same plant and device
    async createData(deviceData) {
        const { id } = deviceData;

        for (const position of deviceData.positions) {
            const { plant_ID, temperature, humidity, lightIntensity, UV_radiation, soilMoisture } = position;

            if (![UV_radiation, lightIntensity, temperature, humidity, soilMoisture].every(val => typeof val === 'number')) {
                throw new Error('Invalid data type');
            }

            const existingData = this.data.find(item => item.device_id === id && item.plant_ID === plant_ID);

            if (existingData) {
                existingData.update(position);
            } else {
                const newEntry = new EnvironmentalData(this.data.length + 1, plant_ID, temperature, humidity, lightIntensity, UV_radiation, soilMoisture);
                newEntry.device_id = id;
                this.data.push(newEntry);
            }
        }

        // Every 10 minutes, insert averaged data and reset
        if (this.isTimeForAverage()) {
            for (const dataItem of this.data) {
                console.log("Environmental Data being inserted:", dataItem);
                await createEnvironmentalAvgData(dataItem);
            }
            this.data = [];
            this.lastMeasurementTime = new Date();
        }
        return id;
    }

    // Checks if it's time to calculate and store average data (every 10 minutes)
    isTimeForAverage() {
        const now = new Date();
        const minutes = now.getMinutes();
        return minutes % 10 === 0;
    }
}

module.exports = new EnvironmentalDataManager();
