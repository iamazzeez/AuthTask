const express = require('express');
const router = express.Router();
const UserModel = require('../schema/users')

router.post('/', async function(req, res) {
    try{
        const UserData = new UserModel({
            _id: req.params.username,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        
    });
        await UserData.save();
        return res.send("Saved user Data")
    }
    catch (error) {
        
        return res.send(error)
    }
})

module.exports = router