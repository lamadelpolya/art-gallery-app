const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    biography: {
      type: String,
    },
    phone: {
      type: String,
    },
    profilePicture: {
      type: String, // This will store the URL of the uploaded profile picture
      default: "", // Default value can be an empty string or a default image URL
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model("User", UserSchema);
