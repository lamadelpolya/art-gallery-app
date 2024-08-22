const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const router = express.Router();
const passport = require("passport");
const API_URL = process.env.API_URL || "http://localhost:5173";

router.post("/register", async (req, res) => {
  console.log("Received data:", req.body); // Check if data is correctly parsed

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

    /*  await user.save(); */
    res.status(201).json({ message: "User registered successfully" });
    console.log("Received data:", res.body); // This will log the incoming data
  } catch (err) {
    console.error("Error during registration:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Login user
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
      // expiresIn: "1h",
    });

    req.user = { _id: user._id };

    res.json({ token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const user = req.user;
    const payload = {
      _id: user._id,
      email: user.email,
      name: user.name,
      photo: user.photo, // Incluye la foto en el payload
    };

    const authToken = jwt.sign(payload, process.env.JWT_SECRET, {
      algorithm: "HS256",
      expiresIn: "6h",
    });
    // Redirige al frontend con el token en la URL
    res.redirect(`${API_URL}/profile?token=${authToken}`);
  }
);

module.exports = router;
