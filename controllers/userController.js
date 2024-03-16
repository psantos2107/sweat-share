//third party modules
const bcrypt = require("bcrypt");
require("dotenv").config();

//our own modules
const User = require("./../models/user");
const isValidURL = require("./../utils/isValidURL");
const ExerciseProgram = require("./../models/exerciseProgram");
const Comment = require("./../models/comment");
const setErrorMessage = require("./../utils/setErrorMessage");

//env variables
const googleAPIKey = process.env.GOOGLE_API_KEY;

const newUser = (req, res) => {
  //if the user was redirected to this route due to an error, that error will be stored in errorMessage and subsequently rendered onto the screen
  const errorMessage = req.flash("signUpError");
  res.render("userViews/new.ejs", { errorMessage });
};

const deleteUser = async (req, res) => {
  try {
    //find the user and delete, delete all exercises and comments associated with the user.
    await User.findByIdAndDelete(req.params.id);
    await ExerciseProgram.deleteMany({ createdBy: req.params.id });
    await Comment.deleteMany({ createdBy: req.params.id });

    //then log the user out
    req.session.destroy(() => {
      console.log("session destroyed and user deleted");
      res.redirect("/exercisePrograms");
    });
  } catch (err) {
    console.error(err);
    res.render("error.ejs", {
      error: `Something went wrong. Unable to delete profile at this time.`,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    //check if the profilePic is a valid URL and then handle that issue
    req.body.profilePic = isValidURL(req.body.profilePic);

    //then just update the user. make sure validators are ran with the update
    const updatedUser = await User.findByIdAndUpdate(
      req.session.currentUser._id,
      { $set: { ...req.body } },
      { new: true, runValidators: true }
    );

    //ensure the currentUser is updated with the new user information
    req.session.currentUser = updatedUser;
    res.redirect(`/users/${req.session.currentUser._id}`);
  } catch (error) {
    console.error(error);
    //set the error message and then send the message back to the client on the original edit page
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
    //ensures that passwords are AT LEAST 6 characters long
    if (req.body.password.length < 6) {
      //custom error handling for password length
      throw new Error("Password must be at least 6 characters long.");
    } else {
      //hashes the pw and ensures profile pic is a valid url
      req.body.profilePic = isValidURL(req.body.profilePic);
      req.body.password = await bcrypt.hash(
        req.body.password,
        await bcrypt.genSalt(10)
      );

      //create the user in the db
      const newUser = await User.create(req.body);
      req.session.currentUser = newUser;
      req.flash("newUserCreated", `Welcome ${newUser.username} to SweatShare!`);
      res.redirect(`/exercisePrograms`);
    }
  } catch (error) {
    console.error(error);
    let errMessage = setErrorMessage(error);
    if (error.errors?.age?.name === "CastError") {
      errMessage = "You must input a proper number for your age";
    }
    req.flash("signUpError", errMessage);
    res.redirect("/users/new");
  }
};

const editUser = (req, res) => {
  //control statement ensures that the user that is logged in IS the user that you're trying to edit
  if (req.session.currentUser._id === req.params.id) {
    //urlEscapeLocation is used for proper usage of the maps embed API
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
    //find the user, then find all associated programs from the user
    const user = await User.findById(req.params.id);
    const userPrograms = await ExerciseProgram.find({
      createdBy: user._id,
    }).select("title description programType difficulty _id");

    //if the user is viewing their own program, then allow them to edit or delete the program
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
  } catch (error) {
    console.error(error);
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
