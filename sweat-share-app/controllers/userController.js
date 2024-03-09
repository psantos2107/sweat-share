const bcrypt = require("bcrypt");
const User = require("./../models/user");

const newUser = (req, res) => {
  const errorMessage = req.flash("signUpError");
  res.render("userViews/new.ejs", { errorMessage });
};

const deleteUser = (req, res) => {
  res.send("user delete");
};

const updateUser = (req, res) => {
  res.send("user patch");
};

const createUser = async (req, res) => {
  try {
    if (req.body.password.length < 6) {
      throw new Error("Password must be at least 6 characters long.");
    } else {
      req.body.password = await bcrypt.hash(
        req.body.password,
        await bcrypt.genSalt(10)
      );
      const newUser = await User.create(req.body);
      req.session.currentUser = newUser;
      console.log("newly created user", newUser);
      console.log("session user:", req.session.currentUser);
      res.redirect(`/users/${newUser._id}`);
    }
  } catch (err) {
    req.flash("signUpError", err.message);
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
