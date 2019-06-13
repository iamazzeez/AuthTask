
const express = require('express');
const router = express.Router();
const UserModel = require('../schema/users')

router.delete('/', function(req, res) {
          
         UserModel.remove({ _id: req.body.username }, function(err) {
            if (!err) {
                return res.send("Removed User")
            }
            else {
              return  res.send(err)
            }
        });
})

module.exports = router
