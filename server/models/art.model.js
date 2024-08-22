const mongoose = require("mongoose");

const ArtworkSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,  // Store the image URL or file path
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the user model as the artist
    required: true
  },
}, { timestamps: true });  // This adds the createdAt and updatedAt fields automatically

const Artwork = mongoose.model('Artwork', ArtworkSchema);
module.exports = Artwork;
