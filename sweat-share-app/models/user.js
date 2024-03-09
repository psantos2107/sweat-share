const path = require("path");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema(
  {
    username: {
      type: String,
      unique: [true, "Username already taken!"],
      required: [true, "You must input a username!"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "You must input a password!"],
      trim: true,
    },
    firstName: {
      type: String,
      required: [true, "You must input some sort of first name!"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "You must input a last name!"],
      trim: true,
    },
    age: { type: Number, required: [true, "you must input an age!"] },
    location: { type: String },
    profilePic: {
      type: String,
      default: path.join(
        __dirname,
        "..",
        "public",
        "imgs",
        "emptyProfilePic.jpg"
      ),
    },
    faveExercise: { type: String },
    about: { type: String, trim: true },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
