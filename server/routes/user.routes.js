const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const User = require("../models/User.model");
const authMiddleware = require("../middleware/auth.middleware");
const router = express.Router();

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// Set up multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Get user details
router.get("/users", authMiddleware, async (req, res) => {
  console.log(req.user);
  try {
    const foundUser = await User.findById(req.user._id);
    console.log(foundUser);
//     const foundUser = await User.findById(req.user.id);
//     if (!foundUser) {
//       return res.status(404).json({ error: "User not found" });
//     }
    res.json(foundUser);
  } catch (error) {
    console.error("Error fetching user:", error.message);
    res.status(500).json({ error: "Failed to fetch user data" });
  }
});

// Update user details
router.put(
  "/update",
  authMiddleware,
  upload.single("profilePicture"),
  async (req, res) => {
    try {
      const { name, email, biography, phone, facebook, twitter, instagram, linkedin, street, city, state, zip, country } = req.body;

      // Handle profile picture upload to Cloudinary if present
      let profilePictureUrl;
      if (req.file) {
        const result = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              resource_type: "image",
              folder: "profile_pictures",
            },
            (error, result) => {
              if (result) resolve(result);
              else reject(error);
            }
          );
          stream.end(req.file.buffer);
        });
        profilePictureUrl = result.secure_url;
      }

      // Update user details
      const updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        {
          name,
          email,
          biography,
          phone,
          profilePicture: profilePictureUrl || req.body.profilePicture,
          socialLinks: {
            facebook,
            twitter,
            instagram,
            linkedin,
          },
          address: {
            street,
            city,
            state,
            zip,
            country,
          },
        },
        { new: true }
      );

      res.json(updatedUser);
    } catch (error) {
      console.error("Update error:", error.message);
      res.status(500).json({ error: "Server error" });
    }
  }
);

module.exports = router;
