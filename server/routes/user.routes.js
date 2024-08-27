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
    const foundUser = await User.findById(req.user._id);
    res.json(foundUser);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Failed to fetch user data" });
  }
});

// Update user profile
router.put(
  "/update",
  authMiddleware,
  upload.single("file"),
  async (req, res) => {
    try {
      const { name, email, biography, phone } = req.body;
      let photoUrl = req.body.photo;

      // Check if a new file is uploaded
      if (req.file) {
        const result = await new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                folder: "profile_pictures",
                transformation: [{ width: 300, height: 300, crop: "limit" }],
              },
              (error, result) => {
                if (error) {
                  reject(error);
                } else {
                  resolve(result.url);
                }
              }
            )
            .end(req.file.buffer);
        });

        photoUrl = result;
      }

      const updateFields = {
        name,
        email,
        biography,
        phone,
        photo: photoUrl,
      };

      const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        updateFields,
        { new: true }
      );
      res.json(updatedUser);
    } catch (error) {
      console.error("Update error:", error);
      res.status(500).json({ error: "Server error" });
    }
  }
);

module.exports = router;
