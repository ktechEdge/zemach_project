const environmentalAvgMiddleware = require('../middleware/environmental_avg');


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



    // Check for the current cnt value and sum
    dbPool.query('SELECT * FROM environmental_data', (err, result) => {
        if (err) return callback(err);

        let cnt = result.length; // Default cnt value
        cnt ++; // Increment cnt value
        // Default values for max and min fields
        let soil_humidity_max = soil_humidity;
        let soil_humidity_min = soil_humidity;
        let uv_radiation_max = uv_radiation;
        let uv_radiation_min = uv_radiation;
        let light_max = light;
        let light_min = light;
        let air_temperature_max = air_temperature;
        let air_temperature_min = air_temperature;
        let air_humidity_max = air_humidity;
        let air_humidity_min = air_humidity;
        //sum
        let uv_radiation_sum = 0;
        let light_sum = 0;
        let air_temperature_sum = 0;
        let air_humidity_sum = 0;
        let soil_humidity_sum = 0;



        if (result.length > 0) {
            soil_humidity_max = Math.max(parseInt(result[result.length - 1].soil_humidity_max, 10), soil_humidity);
            soil_humidity_min = Math.min(parseInt(result[result.length - 1].soil_humidity_min, 10), soil_humidity);
            uv_radiation_max = Math.max(parseInt(result[result.length - 1].uv_radiation_max, 10), uv_radiation);
            uv_radiation_min = Math.min(parseInt(result[result.length - 1].uv_radiation_min, 10), uv_radiation);
            light_max = Math.max(parseInt(result[result.length - 1].light_max, 10), light);
            light_min = Math.min(parseInt(result[result.length - 1].light_min, 10), light);
            air_temperature_max = Math.max(parseFloat(result[result.length - 1].air_temperature_max), air_temperature);
            air_temperature_min = Math.min(parseFloat(result[result.length - 1].air_temperature_min), air_temperature);
            air_humidity_max = Math.max(parseInt(result[result.length - 1].air_humidity_max, 10), air_humidity);
            air_humidity_min = Math.min(parseInt(result[result.length - 1].air_humidity_min, 10), air_humidity);
            //sum
             uv_radiation_sum = uv_radiation + result[result.length-1].uv_radiation_sum;
             light_sum = light + result[result.length-1].light_sum;
             air_temperature_sum = air_temperature + result[result.length-1].air_temperature_sum;
             air_humidity_sum = air_humidity + result[result.length-1].air_humidity_sum;
             soil_humidity_sum = soil_humidity + result[result.length-1].soil_humidity_sum;
        }


        const query = `
            INSERT INTO environmental_data (
                device_id, uv_radiation, uv_radiation_max, uv_radiation_min,
                light, light_max, light_min, air_temperature, air_temperature_max,
                air_temperature_min, air_humidity, air_humidity_max, air_humidity_min,
                soil_humidity, soil_humidity_max, soil_humidity_min, plant_ID, cnt,
                measurement_date, uv_radiation_sum, light_sum, air_temperature_sum, soil_humidity_sum, air_humidity_sum
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
            device_id, uv_radiation, uv_radiation_max, uv_radiation_min,
            light, light_max, light_min, air_temperature, air_temperature_max,
            air_temperature_min, air_humidity, air_humidity_max, air_humidity_min,
            soil_humidity, soil_humidity_max, soil_humidity_min, plant_ID, cnt,
            measurement_date, uv_radiation_sum, light_sum, air_temperature_sum, soil_humidity_sum, air_humidity_sum
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




function soil_max_min(data,result){

    let getsoil = data.soil_humidity;
    let results = result[result.length-1].soil_humidity_max;

    if(result.length>0){

        let canVote = data.soil_humidity >= result[result.length-1].soil_humidity_max ? data.soil_humidity : result[result.length-1].soil_humidity_max;

        console.log(canVote);

    }



}


module.exports = {
    getAllData,
    getDataById,
    createData,
    updateData,
    deleteData
};
