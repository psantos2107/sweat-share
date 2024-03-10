const bcrypt = require("bcrypt");
const User = require("./../models/user");
const ExerciseProgram = require("./../models/exerciseProgram");

const newUser = (req, res) => {
  //if the user was redirected to this route due to an error, that error will be stored in errorMessage and subsequently rendered onto the screen
  const errorMessage = req.flash("signUpError");
  res.render("userViews/new.ejs", { errorMessage });
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    await ExerciseProgram.deleteMany({ _id: req.params.id });
    req.flash(
      "userDeleted",
      `Your account is closed. We're sorry to see you go.`
    );
    res.redirect("/exercisePrograms");
  } catch (err) {
    console.log("There was an error with deleting the user: " + err.message);
  }
};

const updateUser = (req, res) => {
  res.send("user patch");
};

const createUser = async (req, res) => {
  try {
    if (req.body.password.length < 6) {
      //custom error handling for password length
      throw new Error("Password must be at least 6 characters long.");
    } else {
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
    let errMessage = "";
    //catches all validation errors and logs them
    if (error.name === "ValidationError") {
      errMessage = Object.values(error.errors)
        .map((err) => err.message)
        .join(" ");
      //catches CastErrors
      if (error.errors?.age.name === "CastError") {
        errMessage = "You must input a proper number for your age";
      }
    } else {
      errMessage = error.message;
    }
    req.flash("signUpError", errMessage);
    res.redirect("/users/new");
  }
};

const editUser = (req, res) => {
  res.send("user edit");
};

const showUser = async (req, res) => {
  try {
    const user = await db.findById(req.params.id);
    res.render("/userViews/show.ejs", { user });
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
