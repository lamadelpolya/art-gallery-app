const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth.routes");

dotenv.config();

const app = require("./app");

const PORT = process.env.PORT || 5005;

// Start the server
app.listen(PORT, () => {
  console.log("Server running on http://localhost:" + PORT);
});
