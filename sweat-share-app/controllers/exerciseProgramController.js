const ExerciseProgram = require("./../models/exerciseProgram");
const populateUserNames = require("../models/populateUserNames");

const allExPrograms = async (req, res) => {
  //this changes what is in the navbar based on whether a user is logged in or not
  let signup = req.session.currentUser ? false : true;
  let login = req.session.currentUser ? false : true;
  let myProfile = req.session.currentUser ? true : false;
  let id = req.session.currentUser ? req.session.currentUser._id : null;

  //establishing the welcome message
  let welcomeMsg = "";
  let welcomeUser = req.flash("newUserCreated");
  //changes the message based on whether the user is currently logged in or not
  welcomeMsg = req.session.currentUser
    ? `Welcome back, ${req.session.currentUser.username}!`
    : "Welcome, guest!";
  //then changes the message if a certain event, such as deleting an account, or creation of a new user, happened (if needed)
  if (welcomeUser.length) {
    [welcomeMsg] = welcomeUser;
  }
  let exercisePrograms;
  //getting all exercise program entries
  if (req.session.currentUser) {
    exercisePrograms = await ExerciseProgram.find({
      createdBy: { $ne: req.session.currentUser._id },
    }).select("title createdBy description programType difficulty _id");
    exercisePrograms = await populateUserNames(exercisePrograms);
  } else {
    //find all entries
    exercisePrograms = await ExerciseProgram.find({}).select(
      "title createdBy description programType difficulty _id"
    );
    exercisePrograms = await populateUserNames(exercisePrograms);
  }

  res.render("exProgramviews/index.ejs", {
    welcomeMsg,
    signup,
    login,
    myProfile,
    id,
    exercisePrograms,
  });
};

const newExProgram = (req, res) => {
  res.render("exProgramViews/new.ejs");
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
