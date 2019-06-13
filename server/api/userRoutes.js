const express = require('express');
var app = express();
const userRoutes = express.Router();
const UserModel = require('../schema/users')

app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
    next();
  });
userRoutes.route('/:username')
.get( function (req, res) {
    UserModel.findById( req.params.username, function (err, user) {
        if (err) res.send (err);
        res.json(user);
    });
})

.put( function (req, res) {
    UserModel.findById(req.params.username, function (err, user) {
        if (err) res.send(err);
        if(req.body.username) user.username = req.body.username
        if(req.body.name) user.name = req.body.name
        if(req.body.name) user.email =  req.body.email
        if (req.body.password) user.password = req.body.password
        if (req.body.isValid) user.isValid = req.body.isValid

        user.save( function (err){
            if (err) send (err);
            res.json({message: 'User updated'});
        });
    })

    .delete( function (req, res) {    
        UserModel.remove({
            _id: req.params.username
        }, function (err, user) {
            if (err) return res.send(err);
            res.json({ message: 'Deleted' });
        });
    });
})

module.exports = userRoutes