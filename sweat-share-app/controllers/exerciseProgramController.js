const ExerciseProgram = require("./../models/exerciseProgram");

const allExPrograms = (req, res) => {
  res.send("exProgram index");
};

const newExProgram = (req, res) => {
  res.send("exProgram new");
};

const deleteExProgram = (req, res) => {
  res.send("exProgram delete");
};

const updateExProgram = (req, res) => {
  res.send("exProgram patch");
};

const createExProgram = (req, res) => {
  res.send("exProgram create");
};

const editExProgram = (req, res) => {
  res.send("exProgram edit");
};

const showExProgram = (req, res) => {
  res.send("exProgram show");
};

module.exports = {
  allExPrograms,
  newExProgram,
  deleteExProgram,
  updateExProgram,
  createExProgram,
  editExProgram,
  showExProgram,
};
