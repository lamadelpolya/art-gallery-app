const express = require('express');
const router = express.Router();
const Collection = require('../models/collection.model');
const verifyToken = require('../middleware/auth.middleware');

router.post('/', verifyToken, async (req, res) => {
  const { title, description, artworks } = req.body;
  const artist = req.user.id;

  try {
    const newCollection = new Collection({ title, description, artworks, artist });
    await newCollection.save();
    res.status(201).json(newCollection);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const collections = await Collection.find().populate('artist', 'name email').populate('artworks');
    res.json(collections);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.id).populate('artist', 'name email').populate('artworks');
    if (!collection) return res.status(404).json({ message: 'Collection not found' });
    res.json(collection);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', verifyToken, async (req, res) => {
  const { title, description, artworks } = req.body;
  try {
    const updatedCollection = await Collection.findByIdAndUpdate(req.params.id, { title, description, artworks }, { new: true });
    if (!updatedCollection) return res.status(404).json({ message: 'Collection not found' });
    res.json(updatedCollection);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const deletedCollection = await Collection.findByIdAndDelete(req.params.id);
    if (!deletedCollection) return res.status(404).json({ message: 'Collection not found' });
    res.json({ message: 'Collection deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
