const express = require("express");
const router = express.Router();
const argon2 = require("argon2");
const db = require("../config/firebase");

router.get("/register", function (req, res) {
    res.render("register", { title: "Registration" });
});

router.post("/register", async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const m_number = req.body.number;
    const location = req.body.location;
    const address = req.body.address;
    const aaadhar = req.body.aadhar;
    const p_pic = req.body.profile_pic;
    const password = req.body.password;
    const confirm_password = req.body.confirm_password;
    if (password === confirm_password) {
        try {
            password_hash = await argon2.hash(password);
        } catch (err) {
            console.log("Error hashing password");
        }
        await db.collection("users").add({
            Name: name,
            Email: email,
            Mobile_Number: m_number,
            Address: address,
            Profile_Picture: p_pic,
            Password: password_hash,
        });
        res.redirect("/login");
    }
});

router.get("/login", function (req, res) {
    res.render("login", { title: "Login" });
});

router.post("/login", async (req, res) => {

});

module.exports = router;
