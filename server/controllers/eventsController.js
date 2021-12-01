module.exports.MESSAGE_SENT = "message_sent";
module.exports.USER_JOINED = "user_joined";
module.exports.USER_LEFT = "user_left";

let usersConnections = [];

module.exports.sendEventToAll = (type, content) => {
  usersConnections.forEach(({ username, response }) => {
    console.log(`Sending to: ${username}`);

    let messageStr = `event: ${type}\n`;
    messageStr += `data: ${JSON.stringify(content)}\n\n`;
    console.log(messageStr, username);
    response.write(messageStr);
  });
};

module.exports.eventsHandler = (req, res, next) => {
  const { username } = req.user;
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Origin", "*");

  console.log(`User: ${username} started listening to Events`);

  usersConnections.push({ username, response: res });

  req.on("close", () => {
    usersConnections = usersConnections.filter(
      (user) => user.username !== username
    );
    console.log(`User: ${username} stoped listening to Events`);
  });
};
