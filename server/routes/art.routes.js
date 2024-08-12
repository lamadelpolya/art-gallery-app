const express = require("express");
const router = express.Router();
const Art = require("../models/art.model");
const Collection = require("../models/collection.model");
const Exhibition = require("../models/exhibition.model");
const User = require("../models/User.model");
router.get("/search", async (req, res) => {
  try {
    const { query } = req.query;
    const artworks = await Art.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { artistName: { $regex: query, $options: "i" } }, // Assuming you store artist name in the artwork model
      ],
    });
    res.json(artworks);
  } catch (err) {
    res.status(500).json({ error: "Failed to search artworks" });
  }
});
// Route to fetch all artworks
router.get("/artworks", async (req, res) => {
  try {
    const artworks = await Art.find().populate("artist").exec();
    res.json(artworks);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch artworks" });
  }
});

// Route to handle artwork submission
router.post("/submit", async (req, res) => {
  const { artistInfo, artworks, exhibition } = req.body;

  try {
    // Find or create the user
    let user = await User.findOne({ email: artistInfo.email });
    if (!user) {
      user = new User({
        name: artistInfo.name,
        email: artistInfo.email,
        biography: artistInfo.biography,
        phone: artistInfo.phone,
      });
      await user.save();
    }

    // Save each artwork
    const savedArtworks = [];
    for (const artwork of artworks) {
      const newArt = new Art({
        title: artwork.title,
        description: artwork.description,
        image: artwork.image,
        artist: user._id,
      });
      await newArt.save();
      savedArtworks.push(newArt._id);
    }

    // Optionally, save the exhibition
    if (exhibition && exhibition.title) {
      const newExhibition = new Exhibition({
        title: exhibition.title,
        description: exhibition.description,
        date: exhibition.date,
        location: exhibition.location,
        artworks: savedArtworks,
        artist: user._id,
      });
      await newExhibition.save();
      user.exhibitions.push(newExhibition._id);
    }

    // Add artworks to the user's profile
    user.artworks.push(...savedArtworks);
    await user.save();

    res
      .status(201)
      .json({
        message: "Artwork submitted successfully",
        artworks: savedArtworks,
      });
  } catch (error) {
    res.status(500).json({ error: "Failed to submit artwork" });
  }
});

module.exports = router;
