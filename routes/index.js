const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
    if (!req.session.currentUser) {
        res.render("home.ejs", { title: "Myntra Ambassador" });
    } else {
        res.render("dashboard.ejs", { title: "Myntra Ambassador" });
    }
});

router.use(require("./login"));
router.use(require("./users"));
router.use(require("./test_db"));

module.exports = router;