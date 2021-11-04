const express = require("express");
const pool = require("../config/postgres");

module.exports.NewReferral = async(req, res)=>{
    let ambassadorID = req.body.ambassador_id;
    let inc_score = 1;
    try {
        const inc = await pool.query(
            "UPDATE score SET ref_count = ref_count + ($1) WHERE user_id = ($2) ",
            [inc_score, ambassadorID]
        );
        console.log(`referral count increased for ${ambassadorID}`);
    } catch (err) {
        console.log(err.message);
    }
}