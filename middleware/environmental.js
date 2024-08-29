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
    const { id, Status } = data;  // קבלת ID ו-Status מהנתונים הנכנסים

    // לולאה דרך positions (מערכים של נתונים סביבתיים)
    data.positions.forEach(position => {
        const { plant_ID, temperature, humidity, lightIntensity, UV_radiation, soilMoisture } = position;

        // בדיקת תקינות הנתונים הנכנסים - לבדוק אם הערכים הם מספרים
        if (typeof UV_radiation !== 'number' || typeof lightIntensity !== 'number' ||
            typeof temperature !== 'number' || typeof humidity !== 'number' ||
            typeof soilMoisture !== 'number') {
            callback(new Error('Invalid data type'), null);
            return;
        }

        const measurement_date = new Date(); // הזמן הנוכחי

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

        // בדיקת קיום של device_id ו-plant_ID במערך הנתונים הגלובלי
        const existingDataIndex = environmentalData.findIndex(item => item.device_id === id && item.plant_ID === plant_ID);
        if (existingDataIndex !== -1) {
            // קבלת הערך האחרון עבור device_id ו-plant_ID אלה
            const lastEntry = environmentalData[existingDataIndex];
            cnt = lastEntry.cnt + 1;

            // עדכון ערכי מקסימום ומינימום
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

            // עדכון ערכי סיכום
            UV_radiation_sum += lastEntry.UV_radiation_sum;
            lightIntensity_sum += lastEntry.lightIntensity_sum;
            temperature_sum += lastEntry.temperature_sum;
            humidity_sum += lastEntry.humidity_sum;
            soilMoisture_sum += lastEntry.soilMoisture_sum;

            // עדכון הערך הקיים עבור plant_ID זה
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
            // יצירת ערך חדש עם הערכים המעודכנים
            newEntry = {
                id: environmentalData.length + 1,
                device_id: id,
                plant_ID: plant_ID, // שמירת plant_ID
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

            // הוספת הערך החדש למערך הנתונים הגלובלי
            environmentalData.push(newEntry);
        }
    });

    // בדיקת מעבר 10 דקות מאז המדידה האחרונה
    const now = new Date();
    const minutes = now.getMinutes();
    if (minutes % 4 === 0) {  // שינוי לחישוב במרווחי זמן של 10 דקות
        for (let i = 0; i < environmentalData.length; i++) {
            console.log("Environmental Data being inserted:", environmentalData[i]); // הדפסת הנתונים הנכנסים

            // יצירת נתוני ממוצע סביבתיים ואיפוס המערך
            environmentalAvgMiddleware.createEnvironmentalAvgData(environmentalData[i]);
        }
        global.environmentalData = []; // איפוס המערך
        global.lastMeasurementTime = now; // עדכון זמן המדידה האחרון
    }
    callback(null, id); // שימוש ב-device_id כטיעון בפונקציית callback
};


module.exports = {
    getAllData,
    getDataById,
    createData,
};
