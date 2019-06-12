const mongoose = require('mongoose');
var express = require("express");
const cors = require('cors');
var app = express();
var port = process.env.PORT || 3000;
const bodyParser = require("body-parser");

/** bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */


app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cors())
app.use(bodyParser.json());
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

