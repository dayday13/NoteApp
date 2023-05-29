const app = require("express").Router();
const db = require("../connectToDb");
const bcrypt = require("bcrypt");
const saltRounds = 10;

app.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }
    if (username !== "" && password !== "") {
      db.query(
        "INSERT INTO users (username, password) VALUES (?,?)",
        [username, password],
        (err, result) => {
          if (!err) {
            res.send("User added successfully");
          } else {
            res.send({ err: err });
          }
        }
      );
    }
  });
});
module.exports = app;
