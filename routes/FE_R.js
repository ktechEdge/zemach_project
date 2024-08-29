const express = require('express');
const router = express.Router();
module.exports = router;
router.get("/",(req, res) => {
    res.render("demo_page",{pageTitle:"עמוד כללי"});
});

router.get("/demo_page",(req, res) => {
    res.render("demo_page",{pageTitle:"עמוד כללי"});
});

router.get("/Plants_Statuses",(req, res) => {
    res.render("Plants_Status",{pageTitle:"עמוד כללי"});
});
router.get("/Devices_Location",(req, res) => {
    res.render("Devices_Location",{pageTitle:"עמוד כללי"});
});

router.get("/plant_Status_history",(req, res) => {
    res.render("plant_Status_history",{pageTitle:"plant history"});
});