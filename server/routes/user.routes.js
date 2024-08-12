const express = require('express');
const User = require('../models/User.model');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const router = express.Router();

// Update user profile picture
router.put('/me/profile-picture', auth, upload.single('profilePicture'), async (req, res) => {
  try {
    req.user.profilePicture = `/uploads/profile-pictures/${req.file.filename}`;
    await req.user.save();
    res.json(req.user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload profile picture' });
  }
});

module.exports = router;
