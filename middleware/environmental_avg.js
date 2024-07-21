const express = require('express');
const router = express.Router();

// Data access functions
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
    const sql = 'INSERT INTO environmental_data_avg SET ?';
    dbPool.query(sql, data, callback);
};

const updateEnvironmentalAvgData = (id, data, callback) => {
    const sql = 'UPDATE environmental_data_avg SET ? WHERE id = ?';
    dbPool.query(sql, [data, id], callback);
};

const deleteEnvironmentalAvgData = (id, callback) => {
    const sql = 'DELETE FROM environmental_data_avg WHERE id = ?';
    dbPool.query(sql, [id], callback);
};