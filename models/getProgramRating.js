const Comment = require("./comment");

//implementation of the aggregation pipeline in mongoose
//stage 1: match all comments associated wit the ex program at question
//stage 2: then create a new field called overallRating, which is the avg of all the rating field values on the comments associated with the ex program in question
const getProgramRating = async function (programID) {
  const rating = await Comment.aggregate([
    { $match: { exerciseProgram: programID } },
    { $group: { _id: null, overallRating: { $avg: "$rating" } } },
  ]);
  return rating;
};

module.exports = getProgramRating;

/**/
