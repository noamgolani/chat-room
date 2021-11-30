module.exports.MESSAGE_SENT = "message_sent";
module.exports.USER_JOINED = "user_joined";
module.exports.USER_LEFT = "user_left";

const SSE_HEADERS = {
  "Content-Type": "text/event-stream",
  Connection: "keep-alive",
  "Cache-Control": "no-cache",
};

let usersConnections = [];

module.exports.sendEventToAll = (type, content) => {
  usersConnections.forEach(({ username, response }) => {
    console.log(`Sending to: ${username}`);
    response.write(`event: ${type}\n`);
    response.write(`data: ${JSON.stringify(content)}`);
    response.write("\n\n");
  });
};

module.exports.eventsHandler = async (req, res, next) => {
  try {
    const { username } = req.user;

    res.writeHead(200, SSE_HEADERS);

    console.log(`User: ${username} started listening to Events`);

    usersConnections.push({ username, response: res });

    res.write("data: connected\n\n");

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
