const queryAndSortExPrograms = function (queryObj, query) {
  let exProgramQuery = query;
  console.log(query);
  if (queryObj?.difficulty) {
    exProgramQuery = exProgramQuery
      .where("difficulty")
      .equals(`${queryObj.difficulty}`);
  }
  if (queryObj?.programType) {
    exProgramQuery = exProgramQuery
      .where("programType")
      .equals(`${queryObj.programType}`);
  }
  if (queryObj?.sort) {
    exProgramQuery = exProgramQuery.sort(`${queryObj.sort}`);
  } else {
    exProgramQuery = exProgramQuery.sort("-createdAt");
  }
  return exProgramQuery;
};

module.exports = queryAndSortExPrograms;
