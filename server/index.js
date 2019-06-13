const mongoose = require('mongoose');
var express = require("express");
const cors = require('cors');
var app = express();
var port = process.env.PORT || 5000;
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors())
app.use(bodyParser.json());

const userRoutes = require('../server/api/userRoutes');
const userCreate = require('../server/api/createUser');
const userUpdate = require('../server/api/updateUser');
const userDelete = require('../server/api/deleteUser');

app.use('/users', userRoutes);
app.use('/users/create', userCreate);
app.use('/users/update', userUpdate);
app.use('/users/delete', userDelete);



app.get('/', (req,res) => res.send('Hello'));


const dbURI = "mongodb+srv://admin:admin@cluster0-u6qx9.mongodb.net/test?retryWrites=true&w=majority"

const options = {
  reconnectTries: Number.MAX_VALUE,
  poolSize: 10,
  useNewUrlParser: true  
};

mongoose.connect(dbURI, options).then(
  () => {
    app.listen(port, () => {
        console.log("Server listening on port " + port);
       
       });
    console.log("Database connection established!");
  },
  err => {
    console.log("Error connecting Database instance due to: ", err);
  }
);

