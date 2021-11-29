const express = require("express");
const morgan = require("morgan");

const apiRoute = require("./routes/apiRoute");

const app = express();

app.use(express.json());
app.use(morgan("dev"));

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
