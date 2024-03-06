const Comment = require("./../models/comment");

const deleteComment = (req, res) => {
  res.send("comment delete");
};

const updateComment = (req, res) => {
  res.send("comment patch");
};

const createComment = (req, res) => {
  res.send("commet create");
};

module.exports = {
  deleteComment,
  updateComment,
  createComment,
};
