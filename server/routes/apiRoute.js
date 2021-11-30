const express = require("express");

const chatRoute = require("./chatRoute");
const authRoute = require("./authRoute");
const { eventsHandler } = require("../controllers/eventsController");

const { auth } = require("../middlewares/authHandler");

const apiRoute = express.Router();

apiRoute.use("/auth", authRoute);
apiRoute.use("/chat", auth, chatRoute);
apiRoute.get("/events", auth, eventsHandler);

module.exports = apiRoute;
