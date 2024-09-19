const express = require('express');
const router = express.Router();
module.exports = router;

router.get("/",(req, res) => {
    res.render("demo_page",{pageTitle:"Home Page"});
});

router.get("/Plants_Statuses",(req, res) => {
    res.render("Plants_Status",{pageTitle:"Plants Status"});
});

router.get("/plant_Status_history",(req, res) => {
    res.render("plant_Status_history",{pageTitle:"plant history"});
});

router.get("/Devices_Location",(req, res) => {
    res.render("Devices_Location",{pageTitle:"Device Location"});
});

router.get("/History_Graph",(req, res) => {
    res.render("History_Graph",{pageTitle:"plant history Graph"});
});

router.get("/Workers_Notes",(req, res) => {
    res.render("Workers_Notes",{pageTitle:"Workers Notes"});
});