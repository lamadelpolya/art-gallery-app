// models/Artwork.model.js

const mongoose = require("mongoose");

const ArtSchema = new mongoose.Schema({
  artistInfo: {
      name: String,
      biography: String,
      email: String,
      phone: String,
  },
  artworks: [
      {
          title: String,
          description: String,
          image: String,  // You may store the image URL or file path
      }
  ],
  exhibition: {
      title: String,
      description: String,
      date: Date,
      location: String,
  }
}, { timestamps: true });  // This adds the createdAt and updatedAt fields automatically

const Art = mongoose.model('Art', ArtSchema);
module.exports = Art;