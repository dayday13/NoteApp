const app = require("express").Router();
const db = require("../../connectToDb");

app.post("/addNote", (req, res) => {
  const id = req.body.id;
  const text = req.body.text;
  const image = req.body.image;
  const lastModified = req.body.lastModified;

  db.query("SELECT * FROM notes WHERE id = ?;", [id], (err, result) => {
    //check if the note already exist
    if (err) {
      return res.send({ err: err });
    }
    //if yes,deletes it first
    db.query("DELETE FROM notes WHERE id=?;", [id], (delErr, delResult) => {
      if (delErr) {
        return req.send({ err: err });
      }
      //addes the note in the updated version
      db.query(
        "INSERT INTO notes (id, text, image, lastModified) VALUES (?,?,?,?)",
        [id, text, image, lastModified],
        (err, result) => {
          if (!err) {
            return res.send("Note added successfully");
          }
          res.send({ err: err });
        }
      );
    });
  });
});
module.exports = app;
