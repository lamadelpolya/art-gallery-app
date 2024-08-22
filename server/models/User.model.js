const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  biography: { type: String },
  phone: { type: String },
  role: { type: String },
  googleId: { type: String },
  photo: String,

  // profilePicture: { type: String },
});


module.exports = mongoose.model("User", UserSchema);
