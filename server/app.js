require("dotenv").config();
require("./db");

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./db"); // Import the connection module

const app = express();



app.use(bodyParser.json());
app.options("*", cors());
// Updated CORS setup in your Express server
app.use(cors({
  origin: 'http://localhost:5173',  // Adjust this to match your frontend's origin
}));
app.use(express.json());
// Handle preflight requests for all routes


// Connect to MongoDB
connectDB(); // Use the function to connect to MongoDB

// Routes
app.use("/api/artworks", require("./routes/art.routes"));
app.use("/api", require("./routes/index.routes"));
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/collections", require("./routes/collection.routes"));
app.use("/api/exhibitions", require("./routes/exhibition.routes"));
app.use("/api", require("./routes/apiRoutes"));
app.listen(5005, () => {
  console.log('Server running on http://localhost:5005');
});
require("./config")(app);
require("./error-handling")(app);

module.exports = app;
