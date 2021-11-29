const express = require("express");

const {
  login,
  logout,
  sendMessage,
  event,
} = require("../controllers/apiController");

const apiRoute = express.Router();

apiRoute.post("/login", login);
apiRoute.post("/logout", logout);
apiRoute.post("/message", sendMessage);
apiRoute.get("/event", event);

module.exports = apiRoute;
