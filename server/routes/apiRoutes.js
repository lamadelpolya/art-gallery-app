const express = require('express');
const axios = require('axios');
const getToken = require('../utils/getToken'); 
const router = express.Router();

// Hypothetical cache object
let cachedToken = { value: null, expiry: Date.now() };

async function getCachedToken() {
  if (!cachedToken.value || cachedToken.expiry < Date.now()) {
    cachedToken.value = await getToken();
    cachedToken.expiry = Date.now() + 1000 * 60 * 60; // e.g., 1 hour token expiration
  }
  return cachedToken.value;
}
router.get('/search', async (req, res) => {
  const { query, artist, medium, priceRange } = req.query;
  const filters = {
    title: new RegExp(query, 'i')
  };

  if (artist) filters.artist = artist;
  if (medium) filters.medium = medium;
  if (priceRange) {
    const [min, max] = priceRange.split('-');
    filters.price = { $gte: Number(min), $lte: Number(max) };
  }

  try {
    const artworks = await Artworks.find(filters).populate('artist');
    res.json(artworks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to search artworks' });
  }
});

router.get('/artist/:id', async (req, res) => {
  try {
    const token = await getCachedToken(); 
    const artistId = req.params.id;

    const response = await axios.get(`https://api.artsy.net/api/artists/${artistId}`, {
      headers: {
        'X-Xapp-Token': token,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching artist data:', error.response ? error.response.data : error.message);
    res.status(500).json({
      error: 'Error fetching artist data',
      details: error.response ? error.response.data : undefined
    });
  }
});

module.exports = router;
