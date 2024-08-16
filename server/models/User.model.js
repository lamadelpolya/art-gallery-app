// server/models/User.model.js
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  biography: { type: String },
  phone: { type: String },

  role: { type: String },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
