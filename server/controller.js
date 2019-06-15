const bodyparser = require("body-parser");
var { check, validationResult } = require("express-validator/check");
const bcrypt = require("bcrypt");
const User = require('./schema/users');
const session = require("express-session");

module.exports = function(app) {
 
 
  //---------------------------------------------
  function loginUser(req, res) {
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send({ errors: errors.mapped() });
    }
    User.findOne({
      email: req.body.email
    })
      .then(function(user) {
        if (!user) {
          return res.send({ error: true, message: "User does not exist!" });
        }
        if (req.body.password != user.password) {
          return res.send({ error: true, message: "Wrong password!" });
        }
        if(!user.isValid){
          res.send({error: true, message: "You are not verified yet"})
        }
        req.session.user = user;
        req.session.isLoggedIn = true;
        return res.send({ message: "You are signed in", data: user });
        res.send(user);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  app.post("/api/login", loginUser);
  //----------------------------------------------------
  function isLoggedIn(req, res, next) {
    if (req.session.isLoggedIn) {
      res.send(true);
    } else {
      res.send(false);
    }
  }
  app.get("/api/isloggedin", isLoggedIn);

  //--------------------------------------
  //get user
  function getUserDetails(req, res) {
    User.findOne({
      username: req.body.username
    })
      .then(function(user) {
    
        return res.send({ message: "You are signed in", data: user });
        res.send(user);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  app.post("/api/getuser", getUserDetails);


   //get user to edit
   function getUserDetails(req, res) {
    User.findOne({
      username: req.params.id
    })
      .then(function(user) {
    
        return res.send({ message: "You are signed in", data: user });
        res.send(user);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  app.get("/api/getuser/:id", getUserDetails);
   //------------------------------------------------------
   function showUsers(req, res) {
    User.find()
      .then(users => {
        res.json(users);
      })
      .catch(error => {
        res.json(error);
      });
  }
  app.get("/api/showusers", showUsers);


  app.get("/api/logout", (req, res) => {
    req.session.destroy();
    res.send({ message: "Logged out!" });
  });


//Admin Login
function loginAdmin(req, res) {
  var errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.send({ errors: errors.mapped() });
  }
  User.findOne({
    email: req.body.email
  })
    .then(function(user) {
      if (!user) {
        return res.send({ error: true, message: "User does not exist!" });
      }
      if (req.body.password != user.password) {
        return res.send({ error: true, message: "Wrong password!" });
      }
      // if(!user.isValid){
      //   res.send({error: true, message: "You are not verified yet"})
      // }
      req.session.user = user;
      req.session.isLoggedIn = true;
      return res.send({ message: "You are signed in", data: user });
      res.send(user);
    })
    .catch(function(error) {
      console.log(error);
    });
}
app.post("/api/Adminlogin", loginAdmin);



// Delete Task
app.delete("/api/task/:id", function(req, res, next) {
  User.remove({ username: req.params.id }, function(
    err,
    task
  ) {
    if (err) {
      res.send(err);
    }
    res.json(task);
  });
});


// Update Task
app.put("/api/task/:id", function(req, res, next) {

    User.updateOne(
      { username: req.params.id},
      req.body,
      {},
      function(err, task) {
        if (err) {
          res.send(err);
        }
        res.json(task);
      }
    );
});


app.put("/api/user/:id",  function (req, res) {
  
  User.findOne({ username: req.params.id }, function(error, doc){
      if(error){
          res.send(error)
      } else {
          if(req.body.password){
             doc.password = req.body.password;
          }
          if(req.body.name){
              doc.name = req.body.name
          }
          if(req.body.username){
            doc.username = req.body.username
        }
        if(req.body.username){
          doc.email = req.body.email
      }
      }

     doc.save(function(err, updateObject){
         if(err){
           return  res.send(err)
         } else {
          return   res.send(updateObject)
         }
     });
 })


})

};

