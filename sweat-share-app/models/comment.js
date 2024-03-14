const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    exerciseProgram: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ExerciseProgram",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: [1, "Rating cannot be below a 1"],
      max: [5, "Rating cannot be above a 5"],
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Comment", commentSchema);

/**/
