const mongoose = require("mongoose");
const exerciseSchema = require("./exercise");
const Schema = mongoose.Schema;

const exProgramSchema = new Schema(
  {
    title: { type: String, required: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    description: { type: String, required: true },
    programType: {
      type: String,
      required: true,
      enum: [
        "strength",
        "cardio",
        "power",
        "endurance",
        "flexibility",
        "balance",
        "plyometrics",
        "functional",
        "other",
      ],
    },
    difficulty: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
    },
    exercises: [exerciseSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ExerciseProgram", exProgramSchema);

/**/
