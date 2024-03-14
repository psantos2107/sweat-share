const Comment = require("./../models/comment");

const deleteComment = (req, res) => {
  res.send("comment delete");
};

const createComment = async (req, res) => {
  try {
    const commentObj = { ...req.body };
    commentObj.createdBy = req.session.currentUser._id;
    await Comment.create(commentObj);
    console.log("hits here", commentObj.exerciseProgram);
    res.redirect(`/exercisePrograms/${commentObj.exerciseProgram}`);
  } catch (err) {
    console.error(err);
    res.render("error.ejs", {
      error: "Something went wrong with posting your comment.",
    });
  }
};

module.exports = {
  deleteComment,
  createComment,
};
