// Require the Mongoose package & your environment configuration
const mongoose = require("mongoose");
require("dotenv").config();

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODBURI);
const db = mongoose.connection;

mongoose.connection.on("connected", function () {
  console.log(`Connected to MongoDB ${db.name} at ${db.host}:${db.port}`);
});

db.on("error", function (error) {
  console.error("Connection error:", error);
});

module.exports = {
  User: require("./user"),
  ExerciseProgram: require("./exerciseProgram"),
  Comment: require("./comment"),
};
