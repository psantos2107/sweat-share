const validator = require("validator");

//uses validator to check if a url is valid
const isValidURL = function (url) {
  if (validator.isURL(url)) {
    return url;
  } else {
    return null;
  }
};

module.exports = isValidURL;
