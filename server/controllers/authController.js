const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/User");
const Token = require("../models/Token");

const { SALT_ROUNDS, JWT_SECRET, ACCESS_TIME, REFRESH_TIME } = process.env;

module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.validated;
    const exists = await User.find({ $or: [{ email }, { username }] });

    if (exists.length > 0)
      throw { status: 400, message: "username on email already exists" };

    await User.create({
      username,
      email,
      password: await bcrypt.hash(password, await bcrypt.genSalt(+SALT_ROUNDS)),
    });

    res.send("Registered");
  } catch (err) {
    next(err);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.validated;

    const user = await User.findOne({ username });

    if (!user) throw { status: 400, message: "No such username" };
    if (!bcrypt.compare(password, user.password))
      throw { status: 400, message: "Bad password" };

    const userId = user._id;

    const accessToken = jwt.sign({ username, userId }, JWT_SECRET, {
      expiresIn: ACCESS_TIME,
    });

    const refreshToken = jwt.sign({ userId, username }, JWT_SECRET, {
      expiresIn: REFRESH_TIME,
    });

    await Token.create({ jwt: refreshToken });

    res.send({ accessToken, refreshToken });
  } catch (err) {
    next(err);
  }
};

module.exports.token = async (req, res, next) => {
  try {
    const { token } = req.body;

    if (!token) throw { status: 400, message: "Must provide a token" };

    const { username, userId } = await jwt.verify(token, JWT_SECRET);
    const exists = await Token.findOne({ jwt: token });
    if (!exists) throw { status: 400, message: "Log in again" };

    const accessToken = jwt.sign({ username, userId }, JWT_SECRET, {
      expiresIn: ACCESS_TIME,
    });

    res.send({ accessToken, username, userId });
  } catch (err) {
    next(err);
  }
};

module.exports.logout = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};
