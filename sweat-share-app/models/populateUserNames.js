const ExerciseProgram = require("./exerciseProgram");

const populateUserNames = async function (program) {
  let exercisePrograms = program;

  //populate createdBy so that we can access the username (exercisePrograms at this point will be an array of promises that need to all be ran still)
  exercisePrograms = exercisePrograms.map(async (exProgram) => {
    return await ExerciseProgram.populate(exProgram, {
      path: "createdBy",
      select: "username",
    });
  });

  //runs the array of promises in parallel with Promise.allSettled
  exercisePrograms = await Promise.allSettled(exercisePrograms);

  //maps the new set of exercisePrograms (Promise.allsettled returns an array of objects with status and "value")
  exercisePrograms = exercisePrograms.map((exProgram) => exProgram.value);
  return exercisePrograms;
};

module.exports = populateUserNames;
