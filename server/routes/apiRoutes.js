const express = require("express");
const axios = require("axios");
const getToken = require("../utils/getToken");
const router = express.Router();

const Art = require("../models/art.model");
const Exhibition = require("../models/exhibition.model");
const Collection = require("../models//collection.model");

// Hypothetical cache object
let cachedToken = { value: null, expiry: Date.now() };

async function getCachedToken() {
  if (!cachedToken.value || cachedToken.expiry < Date.now()) {
    cachedToken.value = await getToken();
    cachedToken.expiry = Date.now() + 1000 * 60 * 60; // e.g., 1 hour token expiration
  }
  return cachedToken.value;
}
router.get("/search", async (req, res) => {
  const { query, type, artist, medium } = req.query;

  // Comprobar que se haya seleccionado un tipo de búsqueda válido
  router.get("/search", async (req, res) => {
    const { query, type, medium } = req.query;

    // Comprobar que se haya seleccionado un tipo de búsqueda válido
    if (!["artwork", "artist", "exhibition", "collection"].includes(type)) {
      return res.status(400).json({ error: "Invalid search type" });
    }

    try {
      let results = [];

      if (type === "artwork") {
        // Filtros para la búsqueda de obras de arte
        const filters = {
          title: new RegExp(query, "i"),
          ...(medium && { medium: new RegExp(medium, "i") }),
        };
        results = await Art.find(filters).populate("artist");
      } else if (type === "artist") {
        // Filtro para la búsqueda de artistas
        results = await Artist.find({ name: new RegExp(query, "i") });
      } else if (type === "exhibition") {
        // Filtro para la búsqueda de exposiciones
        results = await Exhibition.find({ title: new RegExp(query, "i") });
      } else if (type === "collection") {
        // Filtro para la búsqueda de colecciones
        results = await Collection.find({ title: new RegExp(query, "i") });
      }

      if (!results.length) {
        return res.status(404).json({ message: "No results found" });
      }

      res.json(results);
    } catch (error) {
      console.error("Error fetching search results:", error);
      res.status(500).json({ error: "Failed to search" });
    }
  });
});

router.get("/artist/:id", async (req, res) => {
  try {
    const token = await getCachedToken();
    const artistId = req.params.id;

    const response = await axios.get(
      `https://api.artsy.net/api/artists/${artistId}`,
      {
        headers: {
          "X-Xapp-Token": token,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error(
      "Error fetching artist data:",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({
      error: "Error fetching artist data",
      details: error.response ? error.response.data : undefined,
    });
  }
});

module.exports = router;
