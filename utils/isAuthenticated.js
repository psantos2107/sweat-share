//checks if the user is logged in or not to access certain pages
const isAuthenticated = (req, res, next) => {
  if (req.session.currentUser) {
    return next();
  } else {
    res.redirect("/sessions/new");
  }
};

module.exports = isAuthenticated;
