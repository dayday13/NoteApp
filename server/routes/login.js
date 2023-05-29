const app = require("express").Router();
const db = require("../connectToDb");
const jwt = require("jsonwebtoken");

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "SELECT * FROM users WHERE username = ? AND password = ?;",
    [username, password],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      if (result.length > 0) {
        const id = result[0].UserID;
        const token = jwt.sign({ id }, "jwtSecret", {
          expiresIn: 300,
        }); //learn about .env so that we wont use jwtSecret
        req.session.user = result;

        res.json({
          auth: true,
          token: token,
          result: result,
          username: username,
        }); // result is all the information from the user who is tryin to log in
      } else {
        res.send({ auth: false, message: "No user exist." });
      }
    }
  );
});
module.exports = app;
