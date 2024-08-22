const mongoose = require('mongoose');

const CollectionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  artworks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Artwork' }],
  artist: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const Collection = mongoose.model('Collection', CollectionSchema);
module.exports = Collection;
