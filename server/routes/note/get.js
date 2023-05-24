const app = require("express").Router();
const db = require("../../connectToDb");

app.get("/getNotes", (req, res) => {
  db.query("SELECT * FROM notes;", (err, result) => {
    if (err) {
      return res.send({ err: err });
    }
    res.send(result);
  });
});

module.exports = app;
