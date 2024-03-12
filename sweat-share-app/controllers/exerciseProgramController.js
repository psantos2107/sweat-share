const ExerciseProgram = require("./../models/exerciseProgram");
const populateUserNames = require("../models/populateUserNames");
const isValidURL = require("./../utils/isValidURL");

const allExPrograms = async (req, res) => {
  try {
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
      //finds all ex programs, selects the fields that we want to display in the index, and sorts based on how recent things were created.
      exercisePrograms = await ExerciseProgram.find({})
        .select("title createdBy description programType difficulty _id")
        .sort("-createdAt");
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
  } catch {
    res.render("error.ejs", {
      error: `Something went wrong loading exercises. Please click the link to retry route again.`,
    });
  }
};

const newExProgram = (req, res) => {
  const errorMessage = req.flash("newExProgramError");
  res.render("exProgramViews/new.ejs", {
    id: req.session.currentUser._id,
    errorMessage,
  });
};

const deleteExProgram = (req, res) => {
  res.send("exProgram delete");
};

const updateExProgram = (req, res) => {
  res.send("exProgram patch");
};

const createExProgram = (req, res) => {
  req.body.createdBy = req.session.currentUser._id;
  req.body.exercises.forEach((exercise) => {
    exercise.sets = parseInt(exercise.sets) || 1;
    exercise.imagePath = isValidURL(exercise.imagePath);
  });
  console.log(req.body);
  ExerciseProgram.create(req.body);
  res.redirect("/exercisePrograms");
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
