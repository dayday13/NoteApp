const app = require("express").Router();
const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  let isExpired = false;
  const token = req.headers[`x-access-token`];

  if (!token) {
    return res.send("Token is not provided.");
  }
  jwt.verify(token, "jwtSecret", (err, decoded) => {
    if (err) {
      return res.json({ auth: false, message: "Faild to authenticate." });
    }
    let dateNow = new Date();
    if (decoded.exp < dateNow.getTime()) {
      return res.json({ auth: false, message: "Token has expired." });
    }
    next();
  });
};

app.get("/verifyToken", verifyJWT, (req, res) => {
  res.send({ auth: true, message: "User is authenticated." });
});

module.exports = app;
