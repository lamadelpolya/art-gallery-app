const express = require("express");
const router = express.Router();
const Artwork = require("../models/art.model");
const User = require("../models/User.model");
const authMiddleware = require("../middleware/auth.middleware");

// Route to handle artwork submission
router.post("/artworks", authMiddleware, async (req, res) => {
  const { artworks } = req.body;

  try {
    // Find the user submitting the artwork
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Save each artwork
    const savedArtworks = [];
    for (const artwork of artworks) {
      const newArtwork = new Artwork({
        title: artwork.title,
        description: artwork.description,
        image: artwork.image,
        artist: user._id, // Associate the artwork with the user
      });
      await newArtwork.save();
      savedArtworks.push(newArtwork);
    }

    res.status(201).json({
      message: "Artwork submitted successfully",
      artworks: savedArtworks,
    });
  } catch (error) {
    console.error("Failed to submit artwork:", error);
    res.status(500).json({ error: "Failed to submit artwork" });
  }
});

// Fetch user's artworks
router.get("/artworks", authMiddleware, async (req, res) => {
  try {
    // Fetch artworks created by the logged-in user
    const userArtworks = await Artwork.find({ artist: req.user.id });

    if (!userArtworks) {
      return res.status(404).json({ message: "No artworks found for this user" });
    }

    res.status(200).json(userArtworks);
  } catch (error) {
    console.error("Failed to fetch user's artworks:", error);
    res.status(500).json({ error: "Failed to fetch user's artworks" });
  }
});

module.exports = router;
