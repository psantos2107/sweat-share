const router = require("express").Router();
const sessionCtrl = require("./../controllers/sessions");

router.get("/new", sessionCtrl.newSession);

// on sessions form submit (log in)
router.post("/", sessionCtrl.createSession);

router.delete("/", sessionCtrl.destroySession);

module.exports = router;
