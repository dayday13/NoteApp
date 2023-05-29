require("dotenv").config();
const app = require("express").Router();
const db = require("../connectToDb");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "SELECT * FROM users WHERE username = ?;",
    [username],
    (err, result) => {
      if (err) {
        res.json({ err: err });
      }

      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (err, response) => {
          if (!response) {
            return res.json({
              auth: false,
              message: "Wrong username/password combination.",
            });
          }
          const id = result[0].UserID; // the userID from the database
          const token = jwt.sign({ id }, process.env.TOKEN_KEY, {
            expiresIn: "2h",
          }); //learn about .env so that we wont use jwtSecret

          res.json({
            auth: true,
            token: token,
            result: result,
          }); // result is all the information from the user who is tryin to log in
        });
      } else {
        res.json({ auth: false, message: "No user exist." });
      }
    }
  );
});
module.exports = app;
