const express = require("express");

const {
  sendMessage,
  getAllMessages,
} = require("../controllers/chatController");

const chatRoute = express.Router();

chatRoute.post("/message", sendMessage);
chatRoute.get("/message", getAllMessages);
