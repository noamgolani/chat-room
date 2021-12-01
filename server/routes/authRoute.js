const express = require("express");
const authRoute = express.Router();

const {
  login,
  logout,
  register,
  token,
} = require("../controllers/authController");

const { auth } = require("../middlewares/authHandler");

const { validateLogin, validateRegister } = require("../middlewares/validator");

authRoute.post("/login", validateLogin, login);
authRoute.post("/token", token);
authRoute.post("/register", validateRegister, register);
authRoute.post("/logout", auth, logout);

module.exports = authRoute;
