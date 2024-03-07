const path = require("path");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    minLength: [1, "Your username must contain at least one character."],
  },
  password: { type: String, required: true, trim: true },
  firstName: {
    type: String,
    required: true,
    trim: true,
    minLength: [1, "Your name must contain at least one character."],
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    minLength: [1, "Your name must contain at least one character."],
  },
  age: { type: Number },
  location: { type: String },
  profilePic: {
    type: String,
    default: path.join(
      __dirname,
      "..",
      "..",
      "public",
      "imgs",
      "emptyProfilePic.jpg"
    ),
  },
  faveExercise: { type: String },
  about: { type: String, trim: true },
  createdAt: { type: Date, default: Date.now(), select: false },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
