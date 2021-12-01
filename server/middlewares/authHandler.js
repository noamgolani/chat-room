const jwt = require("jsonwebtoken");

const { JWT_SECRET } = process.env;

module.exports.auth = async (req, res, next) => {
  try {
    const token = req.headers.auth;

    if (!token) throw { status: 403, message: "Auth error" };
    const { username, userId } = await jwt.verify(token, JWT_SECRET);
    req.user = { username, userId };
    next();
  } catch (error) {
    //TODO add check if jwt error
    next(error);
  }
};
