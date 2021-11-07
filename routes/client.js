const express = require("express");
const router = express.Router();
const pool = require("../config/postgres");
const pgController = require("../controllers/pgController");
const profileController = require("../controllers/profileController");

router.get("/ambassador/:id", profileController.GetProfile);

router.get("/client", function (req, res) {
    res.render("./client/home", { title: "User" });
});

router.post("/client/near-me", async (req, res) => {
    const userLatitude = req.body.latitude;
    const userLongitude = req.body.longitude;
    const r = 6371e3; // metres
    const phy1 = (lat1 * Math.PI) / 180; // φ, λ in radians
    const phy2 = (lat2 * Math.PI) / 180;
    const deltaPhy = ((lat2 - lat1) * Math.PI) / 180;
    const deltaLambda = ((lon2 - lon1) * Math.PI) / 180;

    const a =
        Math.sin(deltaPhy / 2) * Math.sin(deltaPhy / 2) +
        Math.cos(phy1) *
            Math.cos(phy2) *
            Math.sin(deltaLambda / 2) *
            Math.sin(deltaLambda / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    let nearMeData;
    try {
        nearMeData = await pool.query(
            "SELECT * FROM location"
        );
    } catch (err) {
        console.log(err.message);
    }

    console.log(nearMeData.rows);

    const d = r * c; // in metres
    res.render("./client/nearme", { title: "Near Me" });
});

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
