const express = require('express');
const authRoute = express.Router();

const {login, logout, register} = require('../controllers/authController');

authRoute.post('/login', login);
authRoute.post('/register', register);
authRoute.post('/logout', logout);

module.exports = authRoute;
