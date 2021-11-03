const express = require("express");
const router = express.Router();

const passport = require("passport");
const userController = require("../controllers/userController");

router.get("/register", function (req, res) {
    res.render("register", { title: "Registration" });
});
router.get("/login", function (req, res) {
    res.render("login", { title: "Login" });
});

router.post("/register", userController.createUser);
router.post(
    "/login",
    passport.authenticate("local", { failureRedirect: "/login" }),
    userController.createSession
);

router.get("/logout", userController.logout);

module.exports = router;
