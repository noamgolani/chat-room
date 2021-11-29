const event = require("events");
const { MESSAGE_SENT } = require("../events");

//TODO move into a auth route
module.exports.login = async (req, res, next) => {
  try {
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

module.exports.sendMessage = async (req, res, next) => {
  try {
    const { from, message } = req.body;
    eventEmitter.emit(MESSAGE_SENT, from, message);
    res.status(200).send("Message Sent");
  } catch (err) {
    next(err);
  }
};

module.exports.event = async (req, res, next) => {
  try {
    eventEmitter.once(MESSAGE_SENT, (from, message) => {
      res.send({ from, message });
    });
  } catch (err) {
    next(err);
  }
};
