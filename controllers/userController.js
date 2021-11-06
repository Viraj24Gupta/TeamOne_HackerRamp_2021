const express = require("express");
const argon2 = require("argon2");
const db = require("../config/firebase");
const firebase = require("firebase-admin");
const pgController = require("../controllers/pgController");

module.exports.createUser = async (req, res) => {
    let data = {
        id: Math.random().toString(36).slice(-6),
        name: req.body.name,
        email: req.body.email,
        number: req.body.number,
        location: new firebase.firestore.GeoPoint(
            parseFloat(req.body.latitude),
            parseFloat(req.body.longitude)
        ),
        address: req.body.address,
        password: req.body.password,
    };
    await pgController.NewUser(data);
    const userRef = db.collection("users").doc(data.email);
    const user = await userRef.get();
    if (!user.exists) {
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
    } else {
        console.log("user already exists");
        res.redirect("login");
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

module.exports.ChangePassword = async (req, res) => {
    const new_password = req.body.password;
    let password_hash;
    try {
        password_hash = await argon2.hash(new_password);
    } catch (err) {
        console.log("Error hashing new password");
    }
    await db.collection("users").doc(req.user.email).update({
        password: password_hash,
    });
    res.redirect("/");
};

module.exports.ChangeDescription = async (req, res) => {
    const description = req.body.description;
    await db.collection("users").doc(req.user.email).update({
        description: description,
    });
    res.redirect("/");
};
