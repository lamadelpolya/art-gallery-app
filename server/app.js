require("dotenv").config();
require("./db");

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

require("./config")(app);

const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

// Import and use the auth routes
const authRoutes = require("./routes/auth.routes");
app.use("/api/auth", authRoutes);

require("./error-handling")(app);

module.exports = app;
