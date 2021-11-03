const express = require("express");
const router = express.Router();

router.get("/dash", function (_, res) {
    res.render("dashboard", { title: "dashboard" });
});

router.get("/profile", (req, res)=> {
    res.render('profile', {title: "Profile"})
})

router.get("/referrals", (req, res)=> {
    res.render('referral', {title: "Referrals"})
})

router.get("/earnings", (req, res)=> {
    res.render('earning', {title: "Earnings"})
})

router.get("/about", (req, res)=> {
    res.render('about', {title: "About"})
})

router.get("/contact", (req, res)=> {
    res.render('contact', {title: "Contact"})
})

module.exports = router;
