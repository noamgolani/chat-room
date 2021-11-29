const express = require("express");

const {
  login,
  logout,
  sendMessage,
  eventEmitter,
} = require("../controllers/apiController");

const apiRoute = express.Router();

apiRoute.post("/login", login);
apiRoute.post("/logout", logout);
apiRoute.post("/message", sendMessage);
apiRoute.get("/event", eventEmitter);

module.exports = apiRoute;
