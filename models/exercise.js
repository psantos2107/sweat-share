const path = require("path");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const exerciseSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: [1, "Your name should have at least one character"],
    },
    description: {
      type: String,
      trim: true,
      default: "No description provided",
    },
    sets: { type: Number, default: 1 },
    repetitions: { type: String, default: 1 },
    restTime: { type: String, default: "None specified" },
    imagePath: {
      type: String,
      trim: true,
    },
    equipmentNeeded: { type: String, trim: true, default: "Not specified" },
    muscleWorked: { type: String, default: "Not specified" },
  },
  {
    timestamps: true,
  }
);

module.exports = exerciseSchema;
/**/
