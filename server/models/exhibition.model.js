const mongoose = require('mongoose');

const ExhibitionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  artworks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Art' }],
  artist: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const Exhibition = mongoose.model('Exhibition', ExhibitionSchema);
module.exports = Exhibition;
