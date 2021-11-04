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
            [data.id,0,0]
        );
        const score = await pool.query(
            "INSERT INTO score VALUES ($1,$2,$3,$4,$5,$6)",
            [data.id,0,0,0,0,0]
        );
        console.log(`new user added ${data.id}`);
    } catch (err) {
        console.log(err.message);
    }
};

module.exports.NewReferral = async(req, res)=>{
    let ambassadorID = req.body.ambassador_id;
    let inc_score = 1;
    try {
        const inc = await pool.query(
            "UPDATE score SET ref_count = ref_count + ($1) WHERE user_id = ($2) ",
            [inc_score, ambassadorID]
        );
        console.log(`referral count increased for ${ambassadorID}`);
        res.redirect("/");
    } catch (err) {
        console.log(err.message);
    }
};