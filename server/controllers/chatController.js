const { sendEventToAll, MESSAGE_SENT } = require("./eventsController");

const messages = [];

module.exports.sendMessage = async (req, res, next) => {
  try {
    const { username, userId } = req.ser;
    const { message } = req.body;
    sendEventToAll(userId, MESSAGE_SENT, {
      from: username,
      message,
      timestamp: Date.now(),
    });
    res.status(200).send("Message Sent");
  } catch (err) {
    next(err);
  }
};

module.exports.getAllMessages = async (req, res, next) => {
  try {
    res.send({ messages });
  } catch (err) {
    next(err);
  }
};
