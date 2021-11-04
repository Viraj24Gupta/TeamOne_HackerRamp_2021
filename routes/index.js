const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
    if (!req.isAuthenticated()) {
        res.render("home", { title: "Myntra Ambassador" });
    } else {
        res.render("dashboard", { title: "Myntra Ambassador" });
    }
});

router.use(require("./login"));
router.use(require("./users"));
router.use(require("./client"));
router.use(require("./test_db"));

module.exports = router;
