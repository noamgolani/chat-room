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
  usersConnections.forEach(({ response }) => {
    response.write(`event: ${type}`);
    response.write(`data: ${JSON.stringify(content)}`);
    response.write("\n\n");
  });
};

module.exports.eventsHandler = async (req, res, next) => {
  try {
    const { username } = req.headers;
    // if (
    //   !username ||
    //   usersConnections.find((user) => user.username === username)
    // )
    //   throw { status: 400, messages: "Dont try funny business" };

    res.writeHead(200, SSE_HEADERS);

    usersConnections.push({ username, response: res });

    req.on("close", () => {
      usersConnections = usersConnections.filter(
        (user) => user.username !== username
      );
    });
  } catch (err) {
    next(err);
  }
};
