// models/Artwork.model.js

const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const artworkSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    imageUrl: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true } // Assuming artworks are linked to a user
  },
  {
    timestamps: true
  }
);

module.exports = model("Artwork", artworkSchema);
