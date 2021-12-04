module.exports.MESSAGE_SENT = "message_sent";
module.exports.USER_JOINED = "user_joined";
module.exports.USER_LEFT = "user_left";
module.exports.KEEP_ALIVE = "keep_alive";

let usersConnections = {};
let connectedUsers = [];

module.exports.sendEventToAll = (senderId, type, content) => {
  connectedUsers.forEach((userId) => {
    if (senderId !== userId) this.sendEventToUser(userId, type, content);
  });
};

module.exports.sendEventToUser = (userId, type, content) => {
  console.log(`Sending ${type} to ${userId}`);
  let messageStr = `event: ${type}\n`;
  messageStr += `data: ${JSON.stringify(content)}\n\n`;
  usersConnections[userId].response.write(messageStr);
};

module.exports.getAllConnected = () =>
  connectedUsers.map((userId) => ({
    username: usersConnections[userId].username,
    userId,
  }));

//TODO make a proper log of the events
module.exports.eventsHandler = (req, res, next) => {
  const { username, userId } = req.user;
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Origin", "*");

  if (connectedUsers.includes(userId))
    throw { status: 403, message: "already connected" };

  usersConnections[userId] = { username, response: res };
  connectedUsers.push(userId);

  res.write("data: connected\n\n");

  this.sendEventToAll(userId, this.USER_JOINED, { username, userId });
  console.log(`---- User: ${username} started listening to Events`);

  req.on("close", () => {
    delete usersConnections[userId];
    connectedUsers = connectedUsers.filter((id) => id !== userId);
    this.sendEventToAll(userId, this.USER_LEFT, { username, userId });
    console.log(`---- User: ${username} stoped listening to Events`);
  });
};
