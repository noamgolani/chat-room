const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const apiRoute = require("./routes/apiRoute");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("tiny"));

const { MONGO_URI } = process.env;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the DB...");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

app.use("/api", apiRoute);

// Error handler
app.use((err, req, res, next) => {
  if (err.name === "JsonWebTokenError") {
    err = {
      status: 403,
      message: "Not auth",
    };
  }
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
