const express = require("express");
const router = express.Router();
const pgController = require("../controllers/pgController");
const profileController = require("../controllers/profileController");
const locationController = require("../controllers/locationController");

router.get("/ambassador/:id", profileController.GetProfile);

router.get("/client", function (req, res) {
    res.render("./client/home", { title: "User" });
});

router.post("/client/near-me", locationController.nearMe);

router.get("/client/referral", function (req, res) {
    res.render("./client/referral", {
        title: "Refer",
        id: "",
    });
});

router.get("/client/add_last_mile", function (req, res) {
    res.render("./client/last_mile", {
        title: "Last Mile",
    });
});

router.get("/client/add_return_requests", function (req, res) {
    res.render("./client/return_req", {
        title: "Returns",
    });
});

router.get("/client/referral/:id", function (req, res) {
    res.render("./client/referral", {
        title: "Refer",
        id: req.params.id,
    });
});

router.get("/client/feedback", function (req, res) {
    res.render("./client/feedback", { title: "Feedback" });
});

router.post("/client/referral", pgController.NewReferral);

router.post("/client/add_last_mile", pgController.Random_Last_Mile);

router.post("/client/add_return_requests", pgController.Random_Return_Request);

router.post("/client/feedback", pgController.NewFeedback);

router.post("/last_mile_post", pgController.LastMilePost);

router.post("/return_service_post", pgController.ReturnRequests);

module.exports = router;
