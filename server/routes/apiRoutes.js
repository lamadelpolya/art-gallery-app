const express = require('express');
const axios = require('axios');
const getToken = require('../utils/getToken'); 
const router = express.Router();

router.get('/artist/:id', async (req, res) => {
  try {
    const token = await getToken(); 
    const artistId = req.params.id;

    const response = await axios.get(`https://api.artsy.net/api/artists/${artistId}`, {
      headers: {
        'X-Xapp-Token': token,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching artist data:', error);
    res.status(500).json({ error: 'Error fetching artist data' });
  }
});

module.exports = router;
