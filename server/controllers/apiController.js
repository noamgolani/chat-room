const event = require("events");
const { MESSAGE_SENT } = require("../../src/events");

//TODO move into a auth route

const loggedInUsers = [];
module.exports.login = async (req, res, next) => {
  try {
    const { username } = req.body;
    if (!username || loggedInUsers.includes(username))
      throw { status: 400, message: "Bad username" };
    loggedInUsers.push(username);
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

//TODO move into a messages route
const eventEmitter = new event.EventEmitter();
//TODO move into model
const messages = [];

module.exports.sendMessage = async (req, res, next) => {
  try {
    const { from, message } = req.body;
    eventEmitter.emit(MESSAGE_SENT, from, message);
    res.status(200).send("Message Sent");
  } catch (err) {
    next(err);
  }
};

module.exports.getAllMessages = async (req, res, next) => {
  try {
    res.send(messages);
  } catch (err) {
    next(err);
  }
};

module.exports.event = async (req, res, next) => {
  try {
    eventEmitter.once(MESSAGE_SENT, (from, message) => {
      res.send({ type: MESSAGE_SENT, content: { from, message } });
    });
  } catch (err) {
    next(err);
  }
};
