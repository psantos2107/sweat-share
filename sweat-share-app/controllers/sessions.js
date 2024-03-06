const bcrypt = require("bcrypt");
const User = require("./../models/user");

const newSession = (req, res) => {
  res.send("New session");
  /* res.render("sessions/new.ejs", {
        currentUser: req.session.currentUser,
      }); */
};

const createSession = async (req, res) => {
  res.send("sessions post");
  /* // username is found and password matches
        // successful log in
      
        // username is not found - who cares about password if you don't have a username that is found?
        // unsuccessful login
      
        // username found but password doesn't match
        // unsuccessful login
      
        // some weird thing happened???????
      
        // Step 1 Look for the username
        try {
          const foundUser = await User.findOne({ username: req.body.username });
          if (!foundUser) {
            // if found user is undefined/null not found etc
            res.send('<a  href="/">Sorry, no user found </a>');
          } else if (await bcrypt.compare(req.body.password, foundUser.password)) {
            // user is found yay!
            // yay passwords match!
            // add the user to our session
            req.session.currentUser = foundUser;
            // redirect back to our home page
            console.log("user logged in!");
            res.redirect("/");
          } else {
            // passwords do not match
            res.send('<a href="/"> password does not match </a>');
          }
        } catch (err) {
          //DB error
          console.log(err);
          res.send("oops the db had a problem");
        } */
};

const destroySession = (req, res) => {
  res.send("delete session");
  /*
        req.session.destroy(() => {
          console.log("session ended");
          res.redirect("/fruits");
        }); */
};

module.exports = {
  newSession,
  createSession,
  destroySession,
};
