const express= require('express');
const router = express.Router();

router.get('/', function (req, res){
    res.render('home.ejs', {title: "Myntra Ambassador"})
});

router.get('/register', function (req, res){
    res.render('register.ejs', {title: "Registration"})
});

router.get('/login', function (req, res){
    res.render('login.ejs', {title: "Login"})
});

module.exports = router;