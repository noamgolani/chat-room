const { eventEmitter, USER_JOINED } = require("./eventsController");

module.exports.loggedInUsers = [];

module.exports.login = async (req, res, next) => {
  try {
    const { username } = req.body;
    if (!username || this.loggedInUsers.includes(username))
      throw { status: 400, message: "Bad username" };
    this.loggedInUsers.push(username);

    eventEmitter.emit(USER_JOINED, username);

    res.send("Logged in");
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
