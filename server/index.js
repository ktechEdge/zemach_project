const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs'); // File System module
const path = require('path');
const app = express();
const port = 7575;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');


app.use(express.static(path.join(__dirname, 'css')));
app.use(express.static(path.join(__dirname, 'js')));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "Gen_Edge_Design_Main")));
const fe_rtr = require('./Routes/FE_R');

app.use('/', fe_rtr);


//fs.writeFile: Saves data to a file (device_data.json).
app.post('/save_device_data', (req, res) => {
    const data = req.body;

    // Save the data to a JSON file
    fs.writeFile('device_data.json', JSON.stringify(data, null, 2), (err) => {
        if (err) {
            console.error('Error saving data:', err);
            res.status(500).send('Error saving data');
        } else {
            res.send('Data saved successfully');
        }
    });
});
//fs.readFile: Reads data from a file (device_data.json).
app.get('/device_data', (req, res) => {
    fs.readFile('device_data.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading data:', err);
            res.status(500).send('Error reading data');
        } else {
            res.json(JSON.parse(data));
        }
    });
});



    //res.sendFile: Serves a static file (plants.json) to the client.
app.get('/plants.json', (req, res) => {
    res.sendFile(path.join(__dirname, '../plants.json'));
});
app.listen(port, () => {
    console.log(`Now listening on port http://localhost:${port}`);
});
