const express = require("express");
const router = express.Router();
const Art = require("../models/art.model");
const verifyToken = require("../middleware/auth.middleware");

router.post("/", verifyToken, async (req, res) => {
  const { title, description, imageUrl, uploadImage, tags, collection } =
    req.body;
  const artist = req.user.id;

  try {
    const newArt = new Art({
      title,
      description,
      imageUrl,
      uploadImage,
      tags,
      collection,
      artist,
    });
    await newArt.save();
    res.status(201).json(newArt);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const artworks = await Art.find()
      .populate("artist", "name email")
      .populate("collection");
    res.json(artworks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const artwork = await Art.findById(req.params.id)
      .populate("artist", "name email")
      .populate("collection");
    if (!artwork) return res.status(404).json({ message: "Artwork not found" });
    res.json(artwork);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", verifyToken, async (req, res) => {
  const { title, description, imageUrl, uploadImage, tags, collection } =
    req.body;
  try {
    const updatedArt = await Art.findByIdAndUpdate(
      req.params.id,
      { title, description, imageUrl, uploadImage, tags, collection },
      { new: true }
    );
    if (!updatedArt)
      return res.status(404).json({ message: "Artwork not found" });
    res.json(updatedArt);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const deletedArt = await Art.findByIdAndDelete(req.params.id);
    if (!deletedArt)
      return res.status(404).json({ message: "Artwork not found" });
    res.json({ message: "Artwork deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
