const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  pwd: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("users", userSchema);
module.exports = User;
