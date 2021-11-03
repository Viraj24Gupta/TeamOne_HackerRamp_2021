const express = require("express");
const router = express.Router();

router.get("/dash", function (_, res) {
    res.render("dashboard", { title: "dashboard" });
});

module.exports = router;
