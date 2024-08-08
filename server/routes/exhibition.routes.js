const express = require("express");
const router = express.Router();
const Exhibition = require("../models/exhibition.model");
const verifyToken  = require("../middleware/auth.middleware");

router.post("/", verifyToken, async (req, res) => {
  const { title, description, artworks, startDate, endDate } = req.body;
  const artist = req.user.id;

  try {
    const newExhibition = new Exhibition({
      title,
      description,
      artworks,
      artist,
      startDate,
      endDate,
    });
    await newExhibition.save();
    res.status(201).json(newExhibition);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const exhibitions = await Exhibition.find()
      .populate("artist", "name email")
      .populate("artworks");
    res.json(exhibitions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const exhibition = await Exhibition.findById(req.params.id)
      .populate("artist", "name email")
      .populate("artworks");
    if (!exhibition)
      return res.status(404).json({ message: "Exhibition not found" });
    res.json(exhibition);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", verifyToken, async (req, res) => {
  const { title, description, artworks, startDate, endDate } = req.body;
  try {
    const updatedExhibition = await Exhibition.findByIdAndUpdate(
      req.params.id,
      { title, description, artworks, startDate, endDate },
      { new: true }
    );
    if (!updatedExhibition)
      return res.status(404).json({ message: "Exhibition not found" });
    res.json(updatedExhibition);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const deletedExhibition = await Exhibition.findByIdAndDelete(req.params.id);
    if (!deletedExhibition)
      return res.status(404).json({ message: "Exhibition not found" });
    res.json({ message: "Exhibition deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
