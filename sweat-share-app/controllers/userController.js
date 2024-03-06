const User = require("./../models/user");

const newUser = (req, res) => {
  res.send("user new");
};

const deleteUser = (req, res) => {
  res.send("user delete");
};

const updateUser = (req, res) => {
  res.send("user patch");
};

const createUser = (req, res) => {
  res.send("user create");
};

const editUser = (req, res) => {
  res.send("user edit");
};

const showUser = (req, res) => {
  res.send("user show");
};

module.exports = {
  newUser,
  deleteUser,
  updateUser,
  createUser,
  editUser,
  showUser,
};
