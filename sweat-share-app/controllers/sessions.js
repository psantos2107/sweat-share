const bcrypt = require("bcrypt");
const User = require("./../models/user");

const newSession = (req, res) => {
  res.render("sessions/new.ejs");
};

const createSession = async (req, res) => {
  // Step 1 Look for the username
  try {
    const foundUser = await User.findOne({ username: req.body.username });
    if (!foundUser) {
      // if found user is undefined/null not found etc
      res.send('<a  href="/">Sorry, no user found </a>');
    } else if (await bcrypt.compare(req.body.password, foundUser.password)) {
      // add the user to our session
      req.session.currentUser = foundUser;
      // redirect back to our home page
      console.log("user logged in!");
      res.redirect("/exercisePrograms");
    } else {
      res.send('<a href="/"> password does not match </a>');
    }
  } catch (err) {
    res.render("error.ejs", {
      error: "Something went wrong with the database... Please retry again!",
    });
  }
};

const destroySession = (req, res) => {
  req.session.destroy(() => {
    console.log("session ended");
    res.redirect("/exercisePrograms");
  });
};

module.exports = {
  newSession,
  createSession,
  destroySession,
};
