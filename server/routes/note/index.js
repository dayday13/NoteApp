const router = require("express").Router();

router.post("/addNote", require("./add"));
router.post("/deleteNote", require("./delete"));
router.get("/getNotes", require("./get"));

module.exports = router;
