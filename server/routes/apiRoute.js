const express = require("express");

const chatRoute = require("./chatRoute");
const authRoute = require("./authRouth");
const { eventRoute } = require("../controllers/eventsController");

const apiRoute = express.Router();

apiRoute.use("/auth", authRoute);
apiRoute.use("/chat", chatRoute);
apiRoute.get("/events", eventRoute);

module.exports = apiRoute;
