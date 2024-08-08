const mongoose = require("mongoose");

const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/art-gallery-app";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(
      `Connected to Mongo! Database name: "${mongoose.connection.name}"`
    );
  } catch (err) {
    console.error("Error connecting to MongoDB: ", err);
    process.exit(1);
  }
};

connectDB();

module.exports = connectDB;
