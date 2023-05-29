const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const db = require("./connectToDb");

const app = express();
app.use(express.json()); //gets the data from the front
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
); //allows the information to pass from back to front
app.use(cookieParser());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(
  session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);
app.use("/", require("./routes/register"));
app.use("/", require("./routes/login"));
app.use("/", require("./routes/addNote"));
app.use("/", require("./routes/editNote"));
app.use("/", require("./routes/editNote"));
app.use("/", require("./routes/getNotes"));
app.use("/", require("./routes/deleteNote"));

app.listen(5000, function () {
  console.log("Server started on port 5000");
  db.connect(function (err) {
    if (err) {
      console.log("Database not connected..");
    } else {
      console.log("Database connected..");
    }
  });
});

//reminder: nodemon helps us to update the server while it still running
