const express = require("express");
const authRoute = express.Router();

const { login, logout } = require("../controllers/authController");

authRoute.post("/login", login);
authRoute.post("/logout", logout);

module.exports = authRoute;
