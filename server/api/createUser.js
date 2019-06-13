const express = require('express');
const mongoose = require("mongoose");
const router = express.Router();
const UserModel = require('../schema/users')

router.post('/', async function(req, res) {
    try{
        const UserData = new UserModel({
            _id: new mongoose.Types.ObjectId(),
            username: req.body.username,
            // name: req.body.name,
            // email: req.body.email,
            // password: req.body.password
        
    });
        const result =   await UserData.save();
        console.log(result)
         res.send("Saved user Data")
    }
    catch (error) {
        
         res.send(error)
    }
})

module.exports = router