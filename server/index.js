const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv= require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const apiRoute = require("./routes/apiRoute");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(morgan("tiny"));

app.use("/api", apiRoute);

// Error handler
app.use((err, req, res, next) => {
  if (err.status) {
    res.status(err.status);
    res.send({ error: err.message });
  } else {
    console.error(err);
    res.status(500);
    res.send({ error: "Internal server error" });
  }
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log("server running...");
});
