const express = require("express");
const db = require("../config/firebase");

module.exports.GetProfile = async(req,res)=>{
    let profile_id = req.params.id;

    const fetch = await db.collection("users").where("id", "==", profile_id).get();
    if (fetch.empty){
        console.log("no user found");
        return;
    }

    fetch.forEach((doc)=>{
        res.render("./profiles/profile", {
            title: doc.data().name,
            id: doc.data().id,
            name: doc.data().name,
            email: doc.data().email,
            m_number: doc.data().number,
            location: doc.data().location,
            address: doc.data().address,
            description: doc.data().description
        });
    });
};
