const event = require("events");

module.exports.eventEmitter = new event.EventEmitter();

module.exports.MESSAGE_SENT = "message_sent";
module.exports.USER_JOINED = "user_joined";
module.exports.USER_LEFT = "user_left";

const connected = [];

module.exports.eventRoute = async (req, res, next) => {
  try {
    const { username } = req.headers;
    if (!username || connected.includes(username))
      throw { status: 400, messages: "Dont try funny business" };

    connected.push(username);

    this.eventEmitter.once(this.MESSAGE_SENT, (from, message) => {
      res.send({ type: this.MESSAGE_SENT, content: { from, message } });
    });

    this.eventEmitter.once(this.USER_JOINED, (username) => {
      res.send({ type: this.USER_JOINED, content: { username } });
    });
  } catch (err) {
    next(err);
  }
};
