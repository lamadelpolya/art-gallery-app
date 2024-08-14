const express = require("express");
const router = express.Router();
const Art = require("../models/art.model");
const Collection = require("../models/collection.model");
const Exhibition = require("../models/exhibition.model");
const User = require("../models/User.model");
const authMiddleware = require("../middleware/auth.middleware");
const fileUploader = require("../config/cloudinary.config");
const Artwork = require("../models/art.model");
router.post("/upload", fileUploader.single("imageUrl"), (req, res, next) => {
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  
  // Send back the URL of the uploaded file
});
router.post('/artworks', (req, res, next) => {
  Artwork.create(req.body)
    .then(createdArtwork => res.status(200).json(createdArtwork))
    .catch(err => next(err));
});
router.get("/artworks", authMiddleware, async (req, res) => {
  try {
    // Fetch artworks created by the logged-in user
    const userArtworks = await Art.find({ artist: req.user.id });

    if (!userArtworks) {
      return res.status(404).json({ message: "No artworks found for this user" });
    }

    res.status(200).json(userArtworks);
  } catch (error) {
    console.error("Failed to fetch user's artworks:", error);
    res.status(500).json({ error: "Failed to fetch user's artworks" });
  }
});
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


// Route to handle artwork submission
router.post("/artworks", authMiddleware, async (req, res) => {
  const { artistInfo, artworks, exhibition } = req.body;
  console.log(req.user);
  try {
    // Find or create the user
    // let user = await User.findOne({ email: artistInfo.email });
    // if (!user) {
    //   user = new User({
    //     name: artistInfo.name,
    //     email: artistInfo.email,
    //     biography: artistInfo.biography,
    //     phone: artistInfo.phone,
    //   });
    //   await user.save();
    // }

    // Save each artwork
    const savedArtworks = [];
    for (const artwork of artworks) {
      const newArt = new Art({
        title: artwork.title,
        description: artwork.description,
        image: artwork.image,
        artist: req.user.id,
      });
      await newArt.save();
      savedArtworks.push(newArt._id);
    }

    // Optionally, save the exhibition
    if (exhibition && exhibition.title) {
      const newExhibition = new Exhibition({
        title: exhibition.title,
        description: exhibition.description,
        date: exhibition.date || new Date(),
        location: exhibition.location,
        artworks: savedArtworks,
        artist: req.user.id,
      });
      await newExhibition.save();
      // user.exhibitions.push(newExhibition._id);
    }

    // Add artworks to the user's profile
    // user.artworks.push(...savedArtworks);
    // await user.save();

    res.status(201).json({
      message: "Artwork submitted successfully",
      artworks: savedArtworks,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to submit artwork" });
  }
});

module.exports = router;
