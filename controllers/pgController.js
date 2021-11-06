const express = require("express");
const pool = require("../config/postgres");

module.exports.Dashboard = async (req, res) => {
    if (!req.isAuthenticated()) {
        res.render("home", { title: "Myntra Ambassador" });
    } else {
        let my_id = req.user.id;
        let get_all_last_mile;
        let get_all_return_req;

        try {
            get_all_last_mile = await pool.query(
                "SELECT * FROM last_mile WHERE ambassador_id = ($1)",
                [my_id]
            );
            get_all_return_req = await pool.query(
                "SELECT * FROM return_request WHERE ambassador_id = ($1)",
                [my_id]
            );
        } catch (err) {
            console.log(err.message);
        }
        res.render("dashboard", {
            title: "Myntra Ambassador",
            meter: "50%",
            last_mile_data: get_all_last_mile.rows,
            return_req_data: get_all_return_req.rows,
        });
    }
};

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

module.exports.Random_Last_Mile = async (req,res) => {
    let ambassadorID = req.body.ambassador_id;
    let random_id = Math.floor(100000 + Math.random() * 900000);
    let random_name = `John Doe ${Math.random().toString(36).slice(-2)}'s Delivery`;

    try {
        const last_mile = await pool.query(
            "INSERT INTO last_mile VALUES ($1,$2,$3)",
            [random_id, random_name, ambassadorID]
        );
        console.log(`random last_mile data ${ambassadorID}`);
        res.redirect("/client");
    } catch (err) {
        console.log(err.message);
    }
};

module.exports.Random_Return_Request = async (req,res) => {
    let ambassadorID = req.body.ambassador_id;
    let random_id = Math.floor(100000 + Math.random() * 900000);
    let random_name = `John Doe ${Math.random().toString(36).slice(-2)}'s Return Request`;
    let inc_score = 1;

    try {
        const last_mile = await pool.query(
            "INSERT INTO return_request VALUES ($1,$2,$3)",
            [random_id, random_name, ambassadorID]
        );

        const score = await pool.query(
            "UPDATE score SET returns_req = returns_req + ($1) WHERE user_id = ($2)",
            [inc_score, ambassadorID]
        );
        console.log(`random return_request data ${ambassadorID}`);
        res.redirect("/client");
    } catch (err) {
        console.log(err.message);
    }
};

module.exports.LastMilePost = async (req,res) => {
    let ambassadorID = req.user.id;
    let client_id = req.body.client_id;
    let bool_check = req.body.bool_check;
    let inc_score = 1;

    try {
        if (bool_check == "yes") {
            const last_mile = await pool.query(
                "DELETE FROM last_mile WHERE client_id = ($1)",
                [client_id]
            );
            const score = await pool.query(
                "UPDATE score SET lm_count = lm_count + ($1) WHERE user_id = ($2)",
                [inc_score, ambassadorID]
            );
        }
        else if (bool_check == "no") {
            const last_mile = await pool.query(
                "DELETE FROM last_mile WHERE client_id = ($1)",
                [client_id]
            );
        }
        res.redirect("/");
    } catch (err) {
        console.log(err.message);
    }
};

module.exports.ReturnRequests = async (req,res) => {
    let ambassadorID = req.user.id;
    let client_id = req.body.client_id;
    let bool_check = req.body.response;
    let inc_score = 1;

    try {
        if (bool_check == "concierge") {
            const return_request = await pool.query(
                "DELETE FROM return_request WHERE client_id = ($1)",
                [client_id]
            );
            const score = await pool.query(
                "UPDATE score SET concierge = concierge + ($1) WHERE user_id = ($2)",
                [inc_score, ambassadorID]
            );
        }
        else if (bool_check == "returned") {
            const return_request = await pool.query(
                "DELETE FROM return_request WHERE client_id = ($1)",
                [client_id]
            );
        }
        res.redirect("/");
    } catch (err) {
        console.log(err.message);
    }
};