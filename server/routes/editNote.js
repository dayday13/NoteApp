const app = require("express").Router();
const db = require("../connectToDb");

app.post("/editNote", (req, res) => {
  const id = req.body.id;
  const text = req.body.text;
  const image = req.body.image;
  const lastModified = req.body.lastModified;

  db.query("SELECT * FROM notes WHERE id = ?;", [id], (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      db.query("DELETE FROM notes WHERE id=?;", [id], (delErr, delResult) => {
        if (delErr) {
          req.send({ err: err });
        } else {
          db.query(
            "INSERT INTO notes (id, text, image, lastModified) VALUES (?,?,?,?)",
            [id, text, image, lastModified],
            (err, result) => {
              if (!err) {
                res.send("Note added successfully");
              } else {
                res.send({ err: err });
              }
            }
          );
        }
      });
    }
  });
});
module.exports = app;
