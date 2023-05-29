const app = require("express").Router();
const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const token = req.headers[`x-access-token`];

  if (!token) {
    return res.send("Token is not provided.");
  }
  jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
    if (err) {
      return res.json({ auth: false, message: "Faild to authenticate." });
    }
    let dateNow = new Date();
    if (decoded.exp < dateNow.getTime() / 1000) {
      return res.json({ auth: false, message: "Token has expired." });
    }
    next();
  });
};

app.get("/verifyToken", verifyJWT, (req, res) => {
  res.send({ auth: true, message: "User is authenticated." });
});

module.exports = app;
