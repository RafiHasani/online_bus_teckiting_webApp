const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/busdb");

function initDB() {
  const db = mongoose.connection;
  try {
    db.on("error", console.error.bind(console, "MongoDB connection error:"));
    db.once("open", () => {
      console.log("Connected to MongoDB");
    });
  } catch (error) {
    console.log(error.message);
  }
  return db;
}

module.exports = { initDB };
