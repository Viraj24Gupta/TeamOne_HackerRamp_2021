const express = require("express");
const pool = require("../config/postgres");
const db = require("../config/firebase");

module.exports.nearMe = async (req, res) => {
    const userLatitude = req.body.latitude;
    const userLongitude = req.body.longitude;
    let data = [];
    let nearMeData;
    try {
        nearMeData = await pool.query("SELECT * FROM location");
    } catch (err) {
        console.log(err.message);
    }
    const r = 6371e3; // metres
    const phy1 = (userLatitude * Math.PI) / 180; // φ, λ in radians
    for (let i = 0; i < nearMeData.rows.length; i++) {
        const phy2 = (nearMeData.rows[i].latitude * Math.PI) / 180;
        const deltaPhy =
            ((nearMeData.rows[i].latitude - userLatitude) * Math.PI) / 180;
        const deltaLambda =
            ((nearMeData.rows[i].longitude - userLongitude) * Math.PI) / 180;
        const a =
            Math.sin(deltaPhy / 2) * Math.sin(deltaPhy / 2) +
            Math.cos(phy1) *
                Math.cos(phy2) *
                Math.sin(deltaLambda / 2) *
                Math.sin(deltaLambda / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = r * c;
        if (d > 10000){
            continue;
        }
        let result = {
            name: "",
            address: "",
            email: "",
            id: "",
            number: "",
            description: "",
            distance: 0,
        };
        const userRef = db.collection("users");
        const snapshot = await userRef
            .where("id", "==", nearMeData.rows[i].user_id)
            .get();
        snapshot.forEach((doc) => {
            const user = doc.data();
            result.name = user.name;
            result.address = user.address;
            result.email = user.email;
            result.id = user.id;
            result.number = user.number;
            if (user.description) {
                result.description = user.description;
            }
        });
        result.distance = d;
        data.push(result);
    }
    data.sort((a, b) => {
        return a.distance - b.distance;
    });
    res.render("./client/nearme", {
        title: "Near Me",
        data: data,
        err: "no available ambassadors near you"
    });
};
