const express = require("express");
const router = express.Router();
const commentCtrl = require("./../controllers/commentsController");

//Delete
router.delete("/:id", commentCtrl.deleteComment);

//Update
router.patch("/:id", commentCtrl.updateComment);

//Create
router.post("/", commentCtrl.createComment);

module.exports = router;
