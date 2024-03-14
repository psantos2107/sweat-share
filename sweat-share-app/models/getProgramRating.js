const Comment = require("./comment");
const getProgramRating = async function (programID) {
  const rating = await Comment.aggregate([
    { $match: { exerciseProgram: programID } },
    { $group: { _id: null, overallRating: { $avg: "$rating" } } },
  ]);
  return rating;
};

module.exports = getProgramRating;
