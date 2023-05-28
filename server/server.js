const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
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

app.use("/", require("./routes/register"));
app.use("/", require("./routes/login"));
app.use("/", require("./routes/verifyToken"));
app.use("/", require("./routes/note"));

app.listen(5000, () => {
  console.log("Server started on port 5000");
  db.connect((err) => {
    if (err) {
      return console.log("Database not connected..");
    }
    console.log("Database connected..");
  });
});

//reminder: nodemon helps us to update the server while it still running
