const { sendEventToAll, MESSAGE_SENT } = require("./eventsController");

const messages = [];

module.exports.sendMessage = async (req, res, next) => {
  try {
    const { from, message } = req.body;
    sendEventToAll(MESSAGE_SENT, { from, message });
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
