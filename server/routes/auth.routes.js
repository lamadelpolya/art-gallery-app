const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const router = express.Router();
const passport = require("passport");
const API_URL = process.env.API_URL || "http://localhost:5173";


// Google OAuth login and registration route
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Google OAuth callback
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const user = req.user;
    const payload = {
      _id: user._id,
      email: user.email,
      name: user.name,
      photo: user.photo,
    };

    const authToken = jwt.sign(payload, process.env.JWT_SECRET, {
      algorithm: "HS256",
      expiresIn: "6h", // Token expires in 6 hours
    });

    // Redirect to frontend with token
    res.redirect(`${API_URL}/profile?token=${authToken}`);
  }
);router.post("/register", async (req, res) => {
  console.log("Received data:", req.body);

  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    console.log("Missing fields:", { name, email, password, role });
    return res.status(400).json({ message: "Please enter all fields" });
  }

  try {
    let foundUser = await User.findOne({ email });
    if (foundUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({ message: "User registered successfully" });
    console.log("Received data:", res.body);
  } catch (err) {
    console.error("Error during registration:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Login user and return token
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      // Optionally, set the token expiration time here
      // expiresIn: "1h",
    });

    res.json({ token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

// Google OAuth
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Google OAuth callback
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const user = req.user;
    const payload = {
      _id: user._id,
      email: user.email,
      name: user.name,
      photo: user.photo,
    };

    const authToken = jwt.sign(payload, process.env.JWT_SECRET, {
      algorithm: "HS256",
      expiresIn: "6h",
    });
    
    res.redirect(`${API_URL}/profile?token=${authToken}`);
  }
);

// New Route: Fetch user profile by token
router.get("/users", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];  // Extract token from the "Authorization" header
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Verify token

    const user = await User.findById(decoded._id);  // Fetch user by decoded token ID
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return user's data (excluding sensitive info)
    res.json({
      name: user.name,
      email: user.email,
      role: user.role,
      photo: user.photo,
    });
  } catch (err) {
    console.error("Error fetching user profile:", err.message);
    return res.status(401).json({ message: "Unauthorized. Invalid token." });
  }
});

module.exports = router;
