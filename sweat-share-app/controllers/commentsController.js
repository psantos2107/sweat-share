const Comment = require("./../models/comment");

const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    await Comment.findByIdAndDelete(req.params.id);
    res.redirect(`/exercisePrograms/${comment.exerciseProgram.toString()}`);
  } catch (error) {
    console.error(error);
    res.render("error.ejs", {
      error:
        "Unable to delete comment at this time. (Either comment not found or something else went wrong)",
    });
  }
};

const createComment = async (req, res) => {
  try {
    const commentObj = { ...req.body };
    commentObj.createdBy = req.session.currentUser._id;
    await Comment.create(commentObj);
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
