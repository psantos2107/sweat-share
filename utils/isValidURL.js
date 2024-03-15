const validator = require("validator");

const isValidURL = function (url) {
  if (validator.isURL(url)) {
    return url;
  } else {
    return null;
  }
};

module.exports = isValidURL;
