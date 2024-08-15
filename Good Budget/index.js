const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();
const cors = require('cors');

const usersRoutes = require("./routes/users");

const app = express();

app.use(cors())
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Origin", 'http://www.apirequest.io');
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, DELETE"
  );
  next();
});
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/users", usersRoutes);

// Error Handling
app.use((err, req, res, next) => {
  console.log(err);
  const status = err.statusCode || 500;
  const message = err.message;
  const data = err.data;
  res.status(status).json({ message: message, errCode: status, data: data });
});

// ---- CHECKING SERVER STATUS ---
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`**** SERVER STARTED AT PORT ${PORT} ****`);
});

// ----- CHECKING IF CONNECTED WITH DATABASE OR CATCH & DISPLAY ERRORS ----
mongoose.connect('mongodb+srv://finely:finely@finely.0jh1r.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (err) => {
  console.log(`**** SOMETHING WENT WRONG **** `);
  console.log(`**** UNABLE TO CONNECT WITH DATABASE ****`);
  console.log(`\n ${err}`);
});

db.once("open", () => {
  console.log("**** CONNECTED WITH DATABASE SUCCESSFULLY ****");
});