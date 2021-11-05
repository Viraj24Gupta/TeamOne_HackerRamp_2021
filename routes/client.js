const express = require("express");
const router = express.Router();

const pgController = require("../controllers/pgController")
const profileController = require("../controllers/profileController")

router.get("/ambassador/:id",profileController.GetProfile);

router.get("/client",function (req, res){
    res.render("./client/home", {title: "User"});
});

router.get("/client/near-me",function (req, res){
    res.render("./client/nearme", {title: "Near Me"});
});

router.get("/client/referral",function (req, res){
    res.render("./client/referral", {
        title: "Refer",
        id: ""
    });
});

router.get("/client/referral/:id",function (req, res){
    res.render("./client/referral", {
        title: "Refer",
        id: req.params.id
    });
});

router.post("/client/referral",pgController.NewReferral);

module.exports = router;