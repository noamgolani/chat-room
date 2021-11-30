module.exports.loggedInUsers = [];

module.exports.login = async (req, res, next) => {
  try {
    const { username } = req.body;
    if (!username || this.loggedInUsers.includes(username))
      throw { status: 400, message: "Bad username" };
    this.loggedInUsers.push(username);

    res.cookie("Auth", username).send("Logged in");
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
