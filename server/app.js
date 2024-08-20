require("dotenv").config();
require("./server");

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db-config"); // Import the connection module
const multer = require("multer");
const path = require("path");
const Art = require("./models/art.model");

const app = express();

connectDB(); // Use the function to connect to MongoDB
app.use(bodyParser.json()); // Can be replaced with express.json()
app.use(express.json()); // This also parses JSON bodies

// Configure Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Save to 'uploads/' directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Add timestamp to file name
  },
});

const upload = multer({ storage: storage });

// Make the 'uploads' folder static so it can be accessed publicly
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Additional Configurations
require("./config")(app);

// Routes
app.use("/api", require("./routes/art.routes"));
app.use("/api", require("./routes/index.routes"));
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/auth", require("./routes/user.routes"));
app.use("/api/collections", require("./routes/collection.routes"));
app.use("/api/", require("./routes/exhibition.routes"));
app.use("/api", require("./routes/apiRoutes"));

// Endpoint for handling file uploads and other form data
app.post("/api/artworks", upload.array("artworks[file]"), (req, res) => {
  try {
    // Access the text fields
    const artistInfo = req.body;
    // Access the uploaded files (if any)
    const files = req.files;

    // Process the data (e.g., save to database)

    res.status(200).json({ message: "Artwork submitted successfully!", files });
  } catch (error) {
    console.error("Error submitting artwork:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Error Handling
require("./error-handling")(app);

module.exports = app;
