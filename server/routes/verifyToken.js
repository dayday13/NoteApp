const app = require("express").Router();
const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const token = req.headers[`x-access-token`];

  if (!token) {
    return res.send("Token is not provided.");
  }
  jwt.verify(token, "jwtSecret", (err, decoded) => {
    if (err) {
      return res.json({ auth: false, message: "Faild to authenticate" });
    }
    req.idOfUser = decoded.id;
    next();
  });
};

app.get("/verifyToken", verifyJWT, (req, res) => {
  res.send({ tokenExist: true, message: "User is authenticated." });
});

module.exports = app;
