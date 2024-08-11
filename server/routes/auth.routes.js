const express = require('express');
const router = express.Router();
const User = require('../models/User.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// User registration route
router.post('/register', async (req, res, next) => {
  const { name, email, password } = req.body;

  // Check if all fields are provided
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please enter all fields' });
  }

  try {
    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user with the hashed password
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Save the new user to the database
    const savedUser = await newUser.save();

    // Send a response with the saved user
    res.status(201).json(savedUser);

  } catch (error) {
    // Pass the error to the error handler
    next(error);
  }
});

// User login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: 3600 });

    // Send the token in the response
    res.json({ token });

  } catch (error) {
    // Handle any server errors
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
