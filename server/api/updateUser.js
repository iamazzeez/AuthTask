const express = require('express');
const router = express.Router();
const UserModel = require('../schema/users')



router.put('/',  function (req, res) {
    let id = req.body.username
    UserModel.findOne({ _id: id }, function(error, doc){
        if(error){
            res.send(error)
        } else {
            if(req.body.password){
               doc.password = req.body.password;
            }
            if(req.body.isValid){
                doc.isValid = req.body.isValid
            }
        }

       doc.save(function(err, updateObject){
           if(err){
             return  res.send(err)
           } else {
            return   res.send("updateObject")
           }
       });
   })


})

module.exports = router;