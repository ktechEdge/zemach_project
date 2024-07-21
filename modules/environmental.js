
const getAllData = async () => {
    const [rows] = await dbPool.query('SELECT * FROM environmental_data');
    return rows;
};

const getDataById = async (id) => {
    const [rows] = await dbPool.query('SELECT * FROM environmental_data WHERE id = ?', [id]);
    return rows[0];
};

const createData = async (data) => {
    const { device_id, uv_radiation, uv_radiation_max, uv_radiation_min, light, light_max, light_min, air_temperature, air_temperature_max, air_temperature_min, air_humidity, air_humidity_max, air_humidity_min, soil_humidity, soil_humidity_max, soil_humidity_min, plant_ID, cnt, measurement_date } = data;
    const [result] = await dbPool.query('INSERT INTO environmental_data (device_id, uv_radiation, uv_radiation_max, uv_radiation_min, light, light_max, light_min, air_temperature, air_temperature_max, air_temperature_min, air_humidity, air_humidity_max, air_humidity_min, soil_humidity, soil_humidity_max, soil_humidity_min, plant_ID, cnt, measurement_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [device_id, uv_radiation, uv_radiation_max, uv_radiation_min, light, light_max, light_min, air_temperature, air_temperature_max, air_temperature_min, air_humidity, air_humidity_max, air_humidity_min, soil_humidity, soil_humidity_max, soil_humidity_min, plant_ID, cnt, measurement_date]);
    return result.insertId;
};

const updateData = async (id, data) => {
    const { device_id, uv_radiation, uv_radiation_max, uv_radiation_min, light, light_max, light_min, air_temperature, air_temperature_max, air_temperature_min, air_humidity, air_humidity_max, air_humidity_min, soil_humidity, soil_humidity_max, soil_humidity_min, plant_ID, cnt, measurement_date } = data;
    await dbPool.query('UPDATE environmental_data SET device_id = ?, uv_radiation = ?, uv_radiation_max = ?, uv_radiation_min = ?, light = ?, light_max = ?, light_min = ?, air_temperature = ?, air_temperature_max = ?, air_temperature_min = ?, air_humidity = ?, air_humidity_max = ?, air_humidity_min = ?, soil_humidity = ?, soil_humidity_max = ?, soil_humidity_min = ?, plant_ID = ?, cnt = ?, measurement_date = ? WHERE id = ?', [device_id, uv_radiation, uv_radiation_max, uv_radiation_min, light, light_max, light_min, air_temperature, air_temperature_max, air_temperature_min, air_humidity, air_humidity_max, air_humidity_min, soil_humidity, soil_humidity_max, soil_humidity_min, plant_ID, cnt, measurement_date, id]);
    return true;
};

const deleteData = async (id) => {
    await dbPool.query('DELETE FROM environmental_data WHERE id = ?', [id]);
    return true;
};

module.exports = {
    getAllData,
    getDataById,
    createData,
    updateData,
    deleteData
};
