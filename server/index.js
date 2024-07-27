const express = require('express');
const port = 2507;
const app = express();
app.use(express.json());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));


app.set("view engine", "ejs");

const path = require('path');
app.use(express.static(path.join(__dirname, "public")));
app.get("/",(req, res) => {
    res.render("demo_page",{pageTitle:"עמוד כללי"});
});
app.get("/login",(req, res) => {
    res.render("login_page",{pageTitle:"עמוד התחברות"});
});

//-------------------------------------------------
app.get("/table_tst",(req, res) => {
    res.render("TableTest",{pageTitle:"טבלה"});
});

//-------------------------------------------------
app.listen(port, () => {            //server starts listening for any attempts from a client to connect at port: {port}
    console.log(`Now listening on port http://localhost:${port}`);
});

