// server/routes/user.routes.js
const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const User = require("../models/User.model");
const authMiddleware = require("../middleware/auth.middleware");
const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = multer.memoryStorage(); // Use memory storage
const upload = multer({ storage }); // Initialize multer with memory storage

// Get user details
router.get("/users", authMiddleware, async (req, res) => {
  console.log(req.user);
  try {
    const foundUser = await User.findById(req.user._id);
    console.log(foundUser);
    res.json(foundUser);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Failed to fetch user data" });
  }
});

// Example in your backend (assuming Node.js and Express)
router.put("/update", authMiddleware, async (req, res) => {
  try {
    const { profilePicture } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { profilePicture },
      { new: true }
    );
    res.json(updatedUser);
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
