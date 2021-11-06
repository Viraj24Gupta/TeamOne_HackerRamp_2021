const express = require("express");
const router = express.Router();
const pgController = require("../controllers/pgController");
const userController = require("../controllers/userController");

router.get("/", pgController.Dashboard);

router.get("/profile", (req, res) => {
    if (!req.isAuthenticated()) {
        res.render("home", { title: "Myntra Ambassador" });
    } else {
        res.render("profile", {
            title: "Profile",
            userID: req.user.id,
            name: req.user.name,
            email: req.user.email,
            m_number: req.user.number,
            address: req.user.address,
            qrcodeID: `${process.env.domainURL}/client/referral/${req.user.id}`,
        });
    }
});

router.post("/change_description", userController.ChangeDescription);

router.get("/referrals", pgController.MyReferrals);

router.get("/earnings", pgController.Earnings);

module.exports = router;
