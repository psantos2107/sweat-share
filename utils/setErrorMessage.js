const setErrorMessage = function (error) {
  //catches all validation errors and logs them
  if (error.name === "ValidationError") {
    return Object.values(error.errors)
      .map((err) => err.message)
      .join(" ");
  } else {
    return error.message;
  }
};

module.exports = setErrorMessage;
