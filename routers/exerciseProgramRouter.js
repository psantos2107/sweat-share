const express = require("express");
const router = express.Router();
const exProgramCtrl = require("./../controllers/exerciseProgramController");
const isAuthenticated = require("./../utils/isAuthenticated");

//Index
router.get("/", exProgramCtrl.allExPrograms);

//New
router.get("/new", isAuthenticated, exProgramCtrl.newExProgram);

//Delete
router.delete("/:id", isAuthenticated, exProgramCtrl.deleteExProgram);

//Update
router.put("/:id", isAuthenticated, exProgramCtrl.updateExProgram);

//Create
router.post("/", isAuthenticated, exProgramCtrl.createExProgram);

//Edit
router.get("/:id/edit", isAuthenticated, exProgramCtrl.editExProgram);

//PDF
router.get("/:id/pdf", isAuthenticated, exProgramCtrl.createProgramPdf);

//Show
router.get("/:id", isAuthenticated, exProgramCtrl.showExProgram);

module.exports = router; /**/
/**/

/**/
