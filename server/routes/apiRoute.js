const express = require("express");

const {
  login,
  logout,
  sendMessage,
  event,
  getAllMessages,
} = require("../controllers/apiController");

const apiRoute = express.Router();

apiRoute.post("/login", login);
apiRoute.post("/logout", logout);
apiRoute.post("/message", sendMessage);
apiRoute.get("/message", getAllMessages);
apiRoute.get("/event", event);

module.exports = apiRoute;
