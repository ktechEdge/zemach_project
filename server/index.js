// const express = require('express');
// const port = 7575;
// const app = express();
// app.use(express.json());
//
// const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({extended: false}));
//
//
// app.set("view engine", "ejs");
//
// const path = require('path');
// app.use(express.static(path.join(__dirname, "public")));
// app.get("/",(req, res) => {
//     res.render("demo_page",{pageTitle:"עמוד כללי"});
// });
// app.get("/login",(req, res) => {
//     res.render("login_page",{pageTitle:"עמוד התחברות"});
// });
// app.get("/table_tst",(req, res) => {
//     res.render("TableTest",{pageTitle:"טבלה"});
// });
// app.listen(port, () => {            //server starts listening for any attempts from a client to connect at port: {port}
//     console.log(`Now listening on port http://localhost:${port}`);
// });



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
const fe_rtr = require('./Routes/FE_R');

app.use('/', fe_rtr);
app.get('/plants.json', (req, res) => {
    res.sendFile(path.join(__dirname, '../plants.json'));
});

// app.get("/demo_page",(req, res) => {
//     res.render("TableTest",{pageTitle:"טבלה"});
// });
app.listen(port, () => {
    console.log(`Now listening on port http://localhost:${port}`);
});