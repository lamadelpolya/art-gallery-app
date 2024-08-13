const mongoose = require("mongoose");

const ArtSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  artist: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  collection: { type: mongoose.Schema.Types.ObjectId, ref: "Collection" },
});

const Art = mongoose.model("Art", ArtSchema);
module.exports = Art;
