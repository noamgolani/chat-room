const express = require("express");

const {
  sendMessage,
  getAllMessages,
} = require("../controllers/chatController");
const { getAllConnected } = require("../controllers/eventsController");

const chatRoute = express.Router();

chatRoute.post("/message", sendMessage);
chatRoute.get("/messages", getAllMessages);
chatRoute.get("/connected", (req, res) => {
  return res.send({ connected: getAllConnected() });
});

module.exports = chatRoute;
