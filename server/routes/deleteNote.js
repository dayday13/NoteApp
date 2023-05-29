const app = require("express").Router();
const db = require("../connectToDb");

app.post("/deleteNote", (req, res) => {
  const id = req.body.id;

  db.query("DELETE FROM notes WHERE id=?;", [id], (delErr, delResult) => {
    if (delErr) {
      res.send({ err: err });
    } else {
      res.send(delResult);
    }
  });
});

module.exports = app;
