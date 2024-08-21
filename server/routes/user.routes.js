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
  try {
    const foundUser = await User.findById(req.user.id);
    if (!foundUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(foundUser);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Failed to fetch user data" });
  }
});

// Update user details
router.put("/update", authMiddleware, upload.single("profilePicture"), async (req, res) => {
  try {
    const { name, email, biography, phone } = req.body;

    // If profilePicture is uploaded, handle Cloudinary upload
    let profilePictureUrl;
    if (req.file) {
      const result = await cloudinary.uploader.upload_stream({
        resource_type: "image",
        folder: "profile_pictures",
      }, req.file.buffer);
      profilePictureUrl = result.secure_url;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        name,
        email,
        biography,
        phone,
        profilePicture: profilePictureUrl || req.body.profilePicture,
      },
      { new: true }
    );

    res.json(updatedUser);
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
