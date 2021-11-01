const express= require('express');
const login = express.Router();

login.get('/', function (req, res){
    res.render('home.ejs', {title: "Myntra Ambassador"})
});

login.get('/register', function (req, res){
    res.render('register.ejs', {title: "Registration"})
});

login.post('/register', function (rew, res){

});

login.get('/login', function (req, res){
    res.render('login.ejs', {title: "Login"})
});

login.post('/login', function (req, res){

});

module.exports = login;