const express = require('express');
const router = express.Router();
module.exports = router;

// router.get("/", (req, res) => {
//     console.log("GET / route hit");
//     res.render("ViewDeviceStatus/ShowDeviceStatus", { pageTitle: "בוקר טוב" });
// });
router.get("/",(req, res) => {
    res.render("demo_page",{pageTitle:"עמוד כללי"});
});

router.get("/Plants_Statuses",(req, res) => {
    res.render("Plants_Status",{pageTitle:"Plants Status"});
});


router.get("/plant_Status_history",(req, res) => {
    res.render("plant_Status_history",{pageTitle:"plant history"});
});