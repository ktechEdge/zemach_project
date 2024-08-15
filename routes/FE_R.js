const express = require('express');
const router = express.Router();
module.exports = router;

router.get("/",(req, res) => {
    res.render("demo_page",{pageTitle:"עמוד כללי"});
});

router.get("/Plants_Statuses",(req, res) => {
    res.render("Plants_Status",{pageTitle:"עמוד כללי"});
});


router.get("/firmware",(req, res) => {
    res.render("upload",{pageTitle:"עמוד כללי"});
});