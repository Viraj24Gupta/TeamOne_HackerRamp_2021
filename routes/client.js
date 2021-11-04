const express = require("express");
const router = express.Router();

const pgController = require("../controllers/pgController")

router.get("/ambassador/:id",function(req,res){
    res.render("./profiles/profile", {
        title: "Ambassador Profile",
        id: req.params.id
    });
});

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