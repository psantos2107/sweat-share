//this is for filtering and sorting the exProgram index page
const queryAndSortExPrograms = function (queryObj, query) {
  let exProgramQuery = query;

  //if the difficulty query is present, then query based on difficulty
  if (queryObj?.difficulty) {
    exProgramQuery = exProgramQuery
      .where("difficulty")
      .equals(`${queryObj.difficulty}`);
  } //if programType query is present, then query based on program type
  if (queryObj?.programType) {
    exProgramQuery = exProgramQuery
      .where("programType")
      .equals(`${queryObj.programType}`);
  } //if sort query is present, then sort based on user input. otherwise, by default, order based on recency of creation
  if (queryObj?.sort) {
    exProgramQuery = exProgramQuery.sort(`${queryObj.sort}`);
  } else {
    exProgramQuery = exProgramQuery.sort("-createdAt");
  }
  //return the new query
  return exProgramQuery;
};

module.exports = queryAndSortExPrograms;
