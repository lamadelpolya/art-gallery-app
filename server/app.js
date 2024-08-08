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

const authRoutes = require("./routes/auth.routes");
app.use("/api/auth", authRoutes);
const artRoutes = require("./routes/art.routes");
app.use("/api/artworks", artRoutes);

const collectionRoutes = require("./routes/collection.routes");
app.use("/api/collections", collectionRoutes);

require("./error-handling")(app);

module.exports = app;
