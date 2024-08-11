require("dotenv").config();
require("./db");

const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const connectDB = require('./db'); // Import the connection module

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Connect to MongoDB
connectDB(); // Use the function to connect to MongoDB

// Routes
app.use('/api/artworks', require('./routes/art.routes'));
app.use("/api", require("./routes/index.routes"));
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/collections", require("./routes/collection.routes"));
app.use("/api/exhibitions", require("./routes/exhibition.routes"));
app.use("/api", require("./routes/apiRoutes"));

require("./config")(app);
require("./error-handling")(app);

module.exports = app;
