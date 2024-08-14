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

router.get("/users", authMiddleware, async (req, res) => {
  try {
    const foundUser = await User.findById(req.user.id);
    res.json(foundUser);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Failed to fetch user data" });
  }
});

router.put(
  "/update",
  authMiddleware,
  upload.single("profilePicture"),
  async (req, res) => {
    try {
      const { name, email, biography, phone } = req.body;
      const updatedFields = { name, email, biography, phone };

      if (req.file) {
        const result = await cloudinary.uploader.upload_stream({
          folder: "profile-pictures",
        });
        updatedFields.profilePicture = result.secure_url; // Save the URL to the database
      }

      const user = await User.findByIdAndUpdate(
        req.user.id,
        { $set: updatedFields },
        { new: true }
      );

      res.json(user);
    } catch (error) {
      console.error("Update error:", error);
      res.status(500).json({ error: "Server error" });
    }
  }
);

module.exports = router;
