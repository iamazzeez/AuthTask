const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

const UserSchema = new Schema({
  _id: ObjectId,
  username: String,
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isValid: {
    type: Boolean,
    default: false
  }

});


module.exports = mongoose.model("users", UserSchema);