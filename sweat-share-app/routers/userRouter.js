const express = require("express");
const router = express.Router();
const userCtrl = require("./../controllers/userController");
const isAuthenticated = require("./../utils/isAuthenticated");

//New
router.get("/new", userCtrl.newUser);

//Delete
router.delete("/:id", isAuthenticated, userCtrl.deleteUser);

//Update
router.put("/:id", isAuthenticated, userCtrl.updateUser);

//Create
router.post("/", userCtrl.createUser);

//Edit
router.get("/:id/edit", isAuthenticated, userCtrl.editUser);

//Show
router.get("/:id", isAuthenticated, userCtrl.showUser);

module.exports = router;
