const express = require('express');
const router = express.Router();
module.exports = router;

// router.get("/", (req, res) => {
//     console.log("GET / route hit");
//     res.render("ViewDeviceStatus/ShowDeviceStatus", { pageTitle: "בוקר טוב" });
// });
router.get("/",(req, res) => {
    res.render("Gen_Edge_Design_Main/demo_page",{pageTitle:"עמוד כללי"});
});

router.get("/Plants_Statuses",(req, res) => {
    res.render("SideBar/Plants_Status",{pageTitle:"עמוד כללי"});
});
