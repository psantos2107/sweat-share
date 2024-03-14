const bcrypt = require("bcrypt");
require("dotenv").config();
const User = require("./../models/user");
const isValidURL = require("./../utils/isValidURL");
const ExerciseProgram = require("./../models/exerciseProgram");
const setErrorMessage = require("./../utils/setErrorMessage");
const googleAPIKey = process.env.GOOGLE_API_KEY;

const newUser = (req, res) => {
  //if the user was redirected to this route due to an error, that error will be stored in errorMessage and subsequently rendered onto the screen
  const errorMessage = req.flash("signUpError");
  res.render("userViews/new.ejs", { errorMessage });
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    await ExerciseProgram.deleteMany({ createdBy: req.params.id });
    req.session.destroy(() => {
      console.log("session destroyed and user deleted");
      res.redirect("/exercisePrograms");
    });
  } catch (err) {
    res.render("error.ejs", {
      error: `Something went wrong. Unable to delete profile at this time.`,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    req.body.profilePic = isValidURL(req.body.profilePic);
    const updatedUser = await User.findByIdAndUpdate(
      req.session.currentUser._id,
      { $set: { ...req.body } },
      { new: true, runValidators: true }
    );
    req.session.currentUser = updatedUser;
    res.redirect(`/users/${req.session.currentUser._id}`);
  } catch (error) {
    let errMessage = setErrorMessage(error);
    if (error.errors?.age?.name === "CastError") {
      errMessage = "You must input a proper number for your age";
    }
    req.flash("updateError", errMessage);
    res.redirect(`/users/${req.session.currentUser._id}/edit`);
  }
};

const createUser = async (req, res) => {
  try {
    if (req.body.password.length < 6) {
      //custom error handling for password length
      throw new Error("Password must be at least 6 characters long.");
    } else {
      req.body.profilePic = isValidURL(req.body.profilePic);
      req.body.password = await bcrypt.hash(
        req.body.password,
        await bcrypt.genSalt(10)
      );
      const newUser = await User.create(req.body);
      req.session.currentUser = newUser;
      req.flash("newUserCreated", `Welcome ${newUser.username} to SweatShare!`);
      res.redirect(`/exercisePrograms`);
    }
  } catch (error) {
    let errMessage = setErrorMessage(error);
    if (error.errors?.age?.name === "CastError") {
      errMessage = "You must input a proper number for your age";
    }
    req.flash("signUpError", errMessage);
    res.redirect("/users/new");
  }
};

const editUser = (req, res) => {
  if (req.session.currentUser._id === req.params.id) {
    let urlEscapedLocation = req.session.currentUser.location
      .split(" ")
      .join("+");
    res.render(`userViews/edit.ejs`, {
      id: req.session.currentUser._id,
      errorMessage: req.flash("updateError")[0] || false,
      user: req.session.currentUser,
      urlEscapedLocation,
      googleAPIKey,
    });
  } else {
    //create error page with custom messages
    res.render("error.ejs", {
      error: `Either user does not exist or you do not have permission to edit this profile.`,
    });
  }
};

const showUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const userPrograms = await ExerciseProgram.find({
      createdBy: user._id,
    }).select("title description programType difficulty _id");
    let editDeleteProfile =
      req.session.currentUser._id === user._id.toString() ? true : false;
    let urlEscapedLocation = user.location.split(" ").join("+"); //transforms all user locations into URL-escaped locations so that we can utilize the google maps API
    res.render("userViews/show.ejs", {
      user,
      id: req.session.currentUser._id,
      editDeleteProfile,
      userPrograms,
      urlEscapedLocation,
      googleAPIKey,
    });
  } catch {
    res.render("error.ejs", { error: "User not found or does not exist." });
  }
};

module.exports = {
  newUser,
  deleteUser,
  updateUser,
  createUser,
  editUser,
  showUser,
};
