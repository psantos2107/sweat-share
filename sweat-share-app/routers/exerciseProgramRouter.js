const express = require("express");
const router = express.Router();
const exProgramCtrl = require("./../controllers/exerciseProgramController");

//Index
router.get("/", exProgramCtrl.allExPrograms);

//New
router.get("/new", exProgramCtrl.newExProgram);

//Delete
router.delete("/:id", exProgramCtrl.deleteExProgram);

//Update
router.patch("/:id", exProgramCtrl.updateExProgram);

//Create
router.post("/", exProgramCtrl.createExProgram);

//Edit
router.get("/:id/edit", exProgramCtrl.editExProgram);

//Show
router.get("/:id", exProgramCtrl.showExProgram);

module.exports = router;
