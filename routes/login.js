const express= require('express');
const login = express.Router();
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
require('dotenv').config();

login.use(bodyParser.urlencoded({extended: false}));

const serviceAccount = require('../key.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
// const storage = firebase.storage();

login.get('/register', function (req, res){
    res.render('register.ejs', {title: "Registration"})
});

login.post('/register', async (req, res)=>{
    const name = req.body.name;
    const email = req.body.email;
    const m_number = req.body.number;
    // const location = req.body.location;
    const address = req.body.address;
    const aaadhar = req.body.aadhar;
    const p_pic = req.body.profile_pic;
    const password = req.body.password;
    const confirm_password = req.body.confirm_password;

    if (password === confirm_password) {
         await db.collection("users").doc(name).set({
             Name: name,
             Email: email,
             Mobile_Number: m_number,
             Address: address,
             Profile_Picture: p_pic,
             Password: password
         })
    }
});

login.get('/login', function (req, res){
    res.render('login.ejs', {title: "Login"})
});

login.post('/login', async (req, res)=>{
    const user = req.body.username;
    const pass = req.body.password;
    var x=0;
    const snapshot = await db.collection("admin").where("username", "==", user).get();
    snapshot.forEach((doc) => {
        // console.log(doc.data().username);
        if(doc.data().password == pass && doc.data().username == user){
            req.session.currentUser = user;
            res.redirect("/");
            x = 1;
        }
    });
    if(x === 0){
        res.render('err',{msg: 'WRONG USERNAME OR PASSWORD',path:'/signin'});
    }
});

module.exports = login;