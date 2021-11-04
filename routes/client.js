const express = require("express");
const router = express.Router();

router.get("/client",function (req, res){
    res.render("./client/home", {title: "User"});
});

router.get("/client/near-me",function (req, res){
    res.render("./client/nearme", {title: "Near Me"});
});

router.get("/client/referral",function (req, res){
    res.render("./client/referral", {title: "Refer"});
});

module.exports = router;