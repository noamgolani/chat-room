const { sendEventToAll, MESSAGE_SENT } = require("./eventsController");

const messages = [];

module.exports.sendMessage = async (req, res, next) => {
  try {
    const { username, userId } = req.user;
    const { message } = req.body;
    const messageContent = {
      from: username,
      message,
      timestamp: Date.now(),
    };
    messages.push(messageContent);
    sendEventToAll(userId, MESSAGE_SENT, messageContent);
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
