const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(express.json());
const publicPath = path.join(__dirname, "public");
app.use(express.static(publicPath));
app.use(cors());

app.listen(3000,() => {
    console.log("The server is running port 3000... ");
})