const mongoose = require('mongoose');

const ExhibitionSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  date: { type: Date },
  location: { type: String},
  artworks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'artworks' }],
  artist: { type: mongoose.Schema.Types.ObjectId, ref: 'user'},
});

const Exhibition = mongoose.model('Exhibition', ExhibitionSchema);
module.exports = Exhibition;
