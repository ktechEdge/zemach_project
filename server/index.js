const express = require('express');
const bodyParser = require('body-parser');
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
app.use(express.static(path.join(__dirname, "SideBar")));
const fe_rtr = require('./Routes/FE_R');

app.use('/', fe_rtr);
app.get('/plants.json', (req, res) => {
    res.sendFile(path.join(__dirname, '../plants.json'));
});
app.listen(port, () => {
    console.log(`Now listening on port http://localhost:${port}`);
});
