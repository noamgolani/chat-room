const express = require('express');
const authRoute = express.Router();

const {login, logout, register} = require('../controllers/authController');
const {validateLogin, validateRegister} = require('../middlewares/validator');

authRoute.post('/login', validateLogin, login);
authRoute.post('/register', validateRegister, register);
authRoute.post('/logout', logout);

module.exports = authRoute;
