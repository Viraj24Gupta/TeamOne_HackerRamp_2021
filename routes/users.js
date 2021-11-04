const express = require("express");
const router = express.Router();

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
            qrcodeID: `${req.user.id}`
        })
    }
})

router.get("/referrals", (req, res)=> {
    if (!req.isAuthenticated()) {
        res.render("home", { title: "Myntra Ambassador" });
    } else {
        res.render('referral', {
            title: "Referrals",
            qrcodeID: `${req.user.id}`
        })

    }
})

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
