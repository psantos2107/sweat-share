const bcrypt = require("bcrypt");
const User = require("./../models/user");

const newSession = (req, res) => {
  const errorMessage = req.flash("loginError");
  res.render("sessionViews/new.ejs", { errorMessage });
};

const createSession = async (req, res) => {
  // Step 1 Look for the username
  try {
    const foundUser = await User.findOne({ username: req.body.username });
    if (!foundUser) {
      // if found user is undefined/null not found etc
      req.flash("loginError", "Username or password is incorrect");
      res.redirect("/sessions/new");
    } else if (await bcrypt.compare(req.body.password, foundUser.password)) {
      // add the user to our session
      req.session.currentUser = foundUser;
      // redirect back to our home page
      console.log("user logged in!");
      res.redirect("/exercisePrograms");
    } else {
      req.flash("loginError", "Username or password is incorrect");
      res.redirect("/sessions/new");
    }
  } catch (err) {
    console.log(err);
  }
};

const destroySession = (req, res) => {
  req.session.destroy(() => {
    console.log("session ended");
    res.redirect("/");
  });
};

module.exports = {
  newSession,
  createSession,
  destroySession,
};
