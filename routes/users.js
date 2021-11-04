const express = require("express");
const router = express.Router();
const pgController = require("../controllers/pgController");

router.get("/profile", (req, res)=> {
    if (!req.isAuthenticated()) {
        res.render("home", { title: "Myntra Ambassador" });
    } else {
        res.render('profile', {
            title: "Profile",
            userID: req.user.id,
            name: req.user.name,
            email: req.user.email,
            m_number: req.user.number,
            address: req.user.address,
            qrcodeID: `${process.env.domainURL}/client/referral/${req.user.id}`
        })
    }
})

router.get("/referrals", pgController.MyReferrals)

router.get("/earnings", (req, res)=> {
    if (!req.isAuthenticated()) {
        res.render("home", { title: "Myntra Ambassador" });
    } else {
        res.render('earning', {title: "Earnings"})

    }
})

router.get("/about", (req, res)=> {
    if (!req.isAuthenticated()) {
        res.render("home", { title: "Myntra Ambassador" });
    } else {
        res.render('about', {title: "About"})
    }
})

router.get("/contact", (req, res)=> {
    if (!req.isAuthenticated()) {
        res.render("home", { title: "Myntra Ambassador" });
    } else {
        res.render('contact', {title: "Contact"})
    }
})

module.exports = router;
