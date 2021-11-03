let express = require("express");
// let test = express();
let test = express.Router();
const pool = require("../config/postgres");

test.post("/test", async (req, res) => {
    console.log("post request from /test");
    try {
        console.log(req.body);
        const user_id = req.body.user_id;
        const lat = req.body.lat;
        const long = req.body.long;
        const test1 = await pool.query(
            "INSERT INTO <table name> VALUES ($1,$2,$3)",
            [user_id, lat, long]
        );
        res.json(test1);
    } catch (err) {
        console.log(err.message);
    }
});

module.exports = test;
