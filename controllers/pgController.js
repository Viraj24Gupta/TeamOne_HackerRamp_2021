const express = require("express");
const pool = require("../config/postgres");

module.exports.NewUser = async(data)=>{
    try {
        const earnings =  await pool.query(
            "INSERT INTO earnings VALUES ($1,$2,$3,$4)",
            [data.id,0,0,0]
        );
        const location = await pool.query(
            "INSERT INTO location VALUES ($1,$2,$3)",
            [data.id,data.location.latitude,data.location.longitude]
        );
        const score = await pool.query(
            "INSERT INTO score VALUES ($1,$2,$3,$4,$5,$6,$7)",
            [data.id,0,0,0,0,0,0]
        );
        console.log(`new user added ${data.id}`);
    } catch (err) {
        console.log(err.message);
    }
};

module.exports.NewReferral = async(req, res)=>{
    let ambassadorID = req.body.ambassador_id;
    let inc_score = 1;
    let random_id = Math.floor(100000 + Math.random() * 900000);
    let random_name = "John Doe " + Math.random().toString(36).slice(-2);

    try {
        const score = await pool.query(
            "UPDATE score SET ref_count = ref_count + ($1) WHERE user_id = ($2) ",
            [inc_score, ambassadorID]
        );

        const client = await pool.query(
            "INSERT INTO client VALUES ($1,$2,$3)",
            [random_id, random_name, ambassadorID]
        );

        console.log(`referral count increased for ${ambassadorID}`);
        res.redirect("/client");
    } catch (err) {
        console.log(err.message);
    }
};

module.exports.MyReferrals = async(req,res)=>{
    let my_id = req.user.id;
    let get_all;
    try {
        get_all = await pool.query(
            "SELECT * FROM client WHERE referee_id = ($1)",
            [my_id]
        );
    } catch (err) {
        console.log(err.message);
    }

    if (!req.isAuthenticated()) {
        res.render("home", { title: "Myntra Ambassador" });
    } else {
        res.render('referral', {
            title: "Referrals",
            qrcodeID: `${process.env.domainURL}/client/referral/${req.user.id}`,
            data: get_all.rows
        })
    }

};

module.exports.NewFeedback = async (req,res)=>{
    let ambassadorID = req.body.ambassador_id;
    let feed = req.body.feedback;
    let inc_score = 1;
    try {
        const feedback_count = await pool.query(
            "UPDATE score SET feedback_count = feedback_count + ($1) WHERE user_id = ($2)",
            [inc_score, ambassadorID]
        )

        const feedback = await pool.query(
            "UPDATE score SET feedback = (feedback + ($1))/feedback_count WHERE user_id = ($2) ",
            [feed, ambassadorID]
        );

        console.log(`feedback updates for ${ambassadorID}`);
        res.redirect("/client");
    } catch (err) {
        console.log(err.message);
    }
};