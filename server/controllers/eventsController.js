module.exports.MESSAGE_SENT = "message_sent";
module.exports.USER_JOINED = "user_joined";
module.exports.USER_LEFT = "user_left";

const SSE_HEADERS = {
  "Content-Type": "text/event-stream",
  Connection: "keep-alive",
  "Cache-Control": "no-cache",
  connection: "open",
};

let usersConnections = [];

module.exports.sendEventToAll = (type, content) => {
  usersConnections.forEach(({ username, response }) => {
    console.log(`Sending to: ${username}`);

    let messageStr = `event: ${type}\n`;
    messageStr += `data: ${JSON.stringify(content)}\n`;
    console.log(messageStr);
    response.write(messageStr);
  });
};

module.exports.eventsHandler = async (req, res, next) => {
  try {
    const { username } = req.user;

    res.writeHead(200, SSE_HEADERS);

    console.log(`User: ${username} started listening to Events`);

    usersConnections.push({ username, response: res });

    res.write("data: connected\nid: 10\n\n");

    req.on("close", () => {
      usersConnections = usersConnections.filter(
        (user) => user.username !== username
      );
      console.log(`User: ${username} stoped listening to Events`);
    });
  } catch (err) {
    next(err);
  }
};
