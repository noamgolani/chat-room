module.exports.auth = (req, res, next) => {
  try {
    const token = req.cookies.Auth;
    if (!token) throw { status: 403, message: "Auth error" };
    req.user = { username: token };
    console.log("passed");
    next();
  } catch (error) {
    next(error);
  }
};
