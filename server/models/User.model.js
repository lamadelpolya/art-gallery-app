const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  biography: { type: String },
  phone: { type: String },
  profilePicture: { type: String }, // Add profile picture field
  artworks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Art' }],
  collections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Collection' }],
  exhibitions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Exhibition' }],
});

// Password hashing middleware
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Generate JWT token
UserSchema.methods.generateAuthToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Compare passwords
UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
