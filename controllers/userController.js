const express = require("express");
const argon2 = require("argon2");
const db = require("../config/firebase");
const { v4: uuidv4 } = require("uuid");

module.exports.createUser = async (req, res) => {
    let data = {
        id: uuidv4(),
        name: req.body.name,
        email: req.body.email,
        number: req.body.number,
        location: req.body.location,
        address: req.body.address,
        aadhar: req.body.aadhar,
        pic: req.body.profile_pic,
        password: req.body.password,
    };
    if (data.password == req.body.confirm_password) {
        try {
            password_hash = await argon2.hash(data.password);
            data.password = password_hash;
        } catch (err) {
            console.log("Error hashing password");
        }
        const inserted_data = await db
            .collection("users")
            .doc(data.email)
            .set(data);
        res.redirect("/login");
    } else {
        console.log("Password does not match");
    }
};

module.exports.createSession = (req, res) => {
    res.redirect("/");
};

module.exports.logout = (req, res) => {
    req.logOut();
    req.session.destroy();
    res.clearCookie("user_id");
    res.redirect("/");
};