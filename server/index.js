const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 5050;

app.use(express.json());
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname)));

let db_M = require('./database');
global.db_pool = db_M.pool;

const midd = require("./middleware/get_device_Id");

app.get("/", [midd.getID], function (req, res, next) {
    if (res.jisOK) {
        res.status(200).json({ message: res.myQuery });
    } else {
        res.status(404).json({ message: "לא נמצאה תוצאה" });
    }
});

app.listen(port, () => {
    console.log(`Now listening on port http://localhost:${port}`);
});
