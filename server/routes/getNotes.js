const app = require("express").Router();
const db = require("../connectToDb");

app.post("/getNotes", (req, res) => {
  db.query("SELECT * FROM notes;", (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(result);
    }
  });
});

module.exports = app;
