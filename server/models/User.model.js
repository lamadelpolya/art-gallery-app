const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  biography: { type: String },
  phone: { type: String },
  artworks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Art' }],
  collections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Collection' }],
  exhibitions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Exhibition' }],
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
