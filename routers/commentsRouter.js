const express = require("express");
const router = express.Router();
const commentCtrl = require("./../controllers/commentsController");
const isAuthenticated = require("./../utils/isAuthenticated");

//Delete
router.delete("/:id", isAuthenticated, commentCtrl.deleteComment);

//Create
router.post("/", isAuthenticated, commentCtrl.createComment);

module.exports = router;

/**/
/**/
