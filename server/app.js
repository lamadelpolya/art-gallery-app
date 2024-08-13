require("dotenv").config();
require("./server");

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db-config"); // Import the connection module

const app = express();

connectDB(); // Use the function to connect to MongoDB
app.use(bodyParser.json()); // Can be replaced with express.json()
app.use(express.json()); // This also parses JSON bodies

// Additional Configurations
require("./config")(app);

// Routes
app.use("/api/artworks", require("./routes/art.routes"));
app.use("/api", require("./routes/index.routes"));
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/auth", require("./routes/user.routes"));
app.use("/api/collections", require("./routes/collection.routes"));
app.use("/api/exhibitions", require("./routes/exhibition.routes"));
app.use("/api", require("./routes/apiRoutes"));

// Error Handling
require("./error-handling")(app);

module.exports = app;
