const event = require("events");
const { MESSAGE_SENT, USER_JOINED } = require("../events");
const eventEmitter = new event.EventEmitter();

//TODO move into a auth route

const loggedInUsers = [];
module.exports.login = async (req, res, next) => {
  try {
    const { username } = req.body;
    if (!username || loggedInUsers.includes(username))
      throw { status: 400, message: "Bad username" };
    loggedInUsers.push(username);

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

//TODO move into a messages route
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

const connected = [];

module.exports.event = async (req, res, next) => {
  try {
    const { username } = req.headers;
    if (!username || connected.includes(username))
      throw { status: 400, messages: "Dont try funny business" };

    connected.push(username);
    eventEmitter.once(MESSAGE_SENT, (from, message) => {
      res.send({ type: MESSAGE_SENT, content: { from, message } });
    });
    eventEmitter.once(USER_JOINED, (username) => {
      res.send({ type: USER_JOINED, content: { username } });
    });
  } catch (err) {
    next(err);
  }
};
