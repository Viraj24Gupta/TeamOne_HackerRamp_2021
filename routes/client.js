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

router.get("/client/add_last_mile",function (req, res){
    res.render("./client/last_mile", {
        title: "Last Mile",
    });
});

router.get("/client/referral/:id",function (req, res){
    res.render("./client/referral", {
        title: "Refer",
        id: req.params.id
    });
});

router.get("/client/feedback",function (req, res){
    res.render("./client/feedback", {title: "Feedback"});
});

router.post("/client/referral",pgController.NewReferral);

router.post("/client/add_last_mile",pgController.Random_Last_Mile);

router.post("/client/feedback",pgController.NewFeedback);

router.post("/last_mile_post",pgController.LastMilePost);


module.exports = router;