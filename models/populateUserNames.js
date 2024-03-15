const ExerciseProgram = require("./exerciseProgram");
const Comment = require("./comment");

const populateUserNames = async function (array, modelType) {
  let objArray = [...array];

  //populate createdBy so that we can access the username (exercisePrograms at this point will be an array of promises that need to all be ran still)
  if (modelType === "exercise") {
    objArray = objArray.map(async (obj) => {
      return await ExerciseProgram.populate(obj, {
        path: "createdBy",
        select: "username",
      });
    });
  } else if (modelType === "comment") {
    objArray = objArray.map(async (obj) => {
      return await Comment.populate(obj, {
        path: "createdBy",
        select: "username",
      });
    });
  }

  //runs the array of promises in parallel with Promise.allSettled
  objArray = await Promise.allSettled(objArray);

  //maps the new set of exercisePrograms (Promise.allsettled returns an array of objects with status and "value")
  objArray = objArray.map((obj) => obj.value);
  return objArray;
};

module.exports = populateUserNames;

/**/
