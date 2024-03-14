const path = require("path");
const ExerciseProgram = require("./../models/exerciseProgram");
const Comment = require("./../models/comment");
const ejs = require("ejs");
const puppeteer = require("puppeteer");
const populateUserNames = require("../models/populateUserNames");
const isValidURL = require("./../utils/isValidURL");
const setErrorMessage = require("../utils/setErrorMessage");
const getProgramRating = require("./../models/getProgramRating");

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
    //finds all ex programs, selects the fields that we want to display in the index, and sorts based on how recent things were created.
    exercisePrograms = await ExerciseProgram.find({})
      .select("title createdBy description programType difficulty _id")
      .sort("-createdAt");
    exercisePrograms = await populateUserNames(exercisePrograms, "exercise");

    res.render("exProgramviews/index.ejs", {
      welcomeMsg,
      signup,
      login,
      myProfile,
      id,
      exercisePrograms,
    });
  } catch (error) {
    console.error(error);
    res.render("error.ejs", {
      error: `Something went wrong loading exercises. Please click the link to retry route again.`,
    });
  }
};

const newExProgram = (req, res) => {
  const [errorMessage] = req.flash("newExProgramError");
  res.render("exProgramViews/new.ejs", {
    id: req.session.currentUser._id,
    errorMessage,
  });
};

const deleteExProgram = async (req, res) => {
  try {
    await Comment.deleteMany({ exerciseProgram: req.params.id }); //removes all comments related to the exerciseProgram
    await ExerciseProgram.findByIdAndDelete(req.params.id); //removes the exercise program
    res.redirect(`/users/${req.session.currentUser._id}`);
  } catch (error) {
    console.error(error);
    res.render("error.ejs", { error: "Failed to delete exercise program." });
  }
};

const updateExProgram = async (req, res) => {
  try {
    req.body.createdBy = req.session.currentUser._id;
    req.body.exercises.forEach((exercise) => {
      exercise.sets = parseInt(exercise.sets);
      exercise.imagePath = isValidURL(exercise.imagePath);
    });
    const newProgram = await ExerciseProgram.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    res.redirect(`/exercisePrograms/${newProgram._id}`);
  } catch (error) {
    console.error(error);
    let errMessage =
      'Error with editing exercise. Ensure all "set" fields have a valid number and make sure all required fields are inputted';
    req.flash("editExProgError", errMessage);
    res.redirect(`/exercisePrograms/${req.params.id}/edit`);
  }
};

const createExProgram = async (req, res) => {
  try {
    req.body.createdBy = req.session.currentUser._id;
    req.body.exercises.forEach((exercise) => {
      exercise.sets = parseInt(exercise.sets);
      exercise.imagePath = isValidURL(exercise.imagePath);
    });
    await ExerciseProgram.create(req.body);
    res.redirect("/exercisePrograms");
  } catch (error) {
    let errMessage = setErrorMessage(error);
    req.flash("newExProgramError", errMessage);
    res.redirect("/exercisePrograms/new");
  }
};

const editExProgram = async (req, res) => {
  try {
    let program = await ExerciseProgram.findById(req.params.id);
    if (!(req.session.currentUser._id === program.createdBy.toString())) {
      throw new Error();
    }
    [program] = await populateUserNames([program], "exercise");
    const errorMessage = req.flash("editExProgError");
    res.render("exProgramViews/edit.ejs", {
      errorMessage,
      id: req.session.currentUser._id,
      program,
    });
  } catch (error) {
    console.error(error);
    res.render("error.ejs", {
      error:
        "Either the program does not exist, or you are not authorized to edit this program.",
    });
  }
};

const showExProgram = async (req, res) => {
  try {
    let program = await ExerciseProgram.findById(req.params.id);
    [program] = await populateUserNames([program], "exercise");
    let comments = await Comment.find({ exerciseProgram: program._id });
    if (comments.length > 0) {
      comments = await populateUserNames(comments, "comment");
    } else {
      comments = null;
    }
    let [programRating] = await getProgramRating(program._id);
    let userViewingOwnProgram =
      program.createdBy._id.toString() === req.session.currentUser._id
        ? true
        : false;
    res.render("exProgramViews/show.ejs", {
      id: req.session.currentUser._id,
      userViewingOwnProgram,
      program,
      comments,
      overallRating: programRating?.overallRating,
    });
  } catch (error) {
    console.error(error);
    res.render("error.ejs", { error: "The exercise program does not exist." });
  }
};

const createProgramPdf = async (req, res) => {
  let browser;
  try {
    //find program
    const program = await ExerciseProgram.findById(req.params.id);

    //launch a headless browser via puppeteer, create a new page on that browser
    browser = await puppeteer.launch();
    const page = await browser.newPage();

    //render html string via EJS templates, and set that content to the page that puppeteer launched
    const html = await ejs.renderFile(
      path.join(__dirname, "..", "views", "exProgramViews", "pdf.ejs"),
      { program }
    );
    await page.setContent(html);

    //convert the page to a pdf, set content headers so that the response is sent as a pdf, A4 is standard pdf format (8.5x11)
    const pdf = await page.pdf({ format: "A4", printBackground: true });
    res.contentType("application/pdf");
    res.send(pdf);
  } catch (error) {
    console.error(error);
    res.render("error.ejs", {
      error:
        "Either the program does not exist or something went wrong with producing the PDF",
    });
  } finally {
    //close the browser created by puppeteer REGARDLESS of whether the PDF was successfully made or not
    if (browser) {
      await browser.close();
    }
  }
};

module.exports = {
  allExPrograms,
  newExProgram,
  deleteExProgram,
  updateExProgram,
  createExProgram,
  editExProgram,
  showExProgram,
  createProgramPdf,
};
