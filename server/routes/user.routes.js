const express = require("express");
const User = require("../models/User.model");
const upload = require("../middleware/upload");
const authMiddleware = require("../middleware/auth.middleware");
const router = express.Router();

router.get("/users", authMiddleware, async (req, res) => {
  const foundUser = await User.findById(req.user.id);
  res.json(foundUser);
});

// Update user profile picture
router.put(
  "/me/profile-picture",
  authMiddleware,
  upload.single("profilePicture"),
  async (req, res) => {
    try {
      req.user.profilePicture = `/uploads/profile-pictures/${req.file.filename}`;
      await req.user.save();
      res.json(req.user);
    } catch (error) {
      res.status(500).json({ error: "Failed to upload profile picture" });
    }
  }
);

module.exports = router;
