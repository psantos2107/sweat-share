const express = require("express");
const router = express.Router();
const userCtrl = require("./../controllers/userController");

//New
router.get("/new", userCtrl.newUser);

//Delete
router.delete("/:id", userCtrl.deleteUser);

//Update
router.patch("/:id", userCtrl.updateUser);

//Create
router.post("/", userCtrl.createUser);

//Edit
router.get("/:id/edit", userCtrl.editUser);

//Show
router.get("/:id", userCtrl.showUser);

module.exports = router;
