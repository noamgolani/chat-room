const bcrypt = require('bcrypt');

const User = require('../models/User');

const saltRounds = process.env.SALT_ROUNDS;

module.exports.register = async (req, res, next) => {
  try {
    const {username, email, password} = req.validated;
    const exists = await User.find({$or: [{email}, {username}]});

    if (exists.length > 0)
      throw {status: 400, message: 'username on email already exists'};

    await User.create({
      username,
      email,
      password: await bcrypt.hash(password, saltRounds),
    });

    res.send('Registered');
  } catch (err) {
    next(err);
  }
};

module.exports.login = async (req, res, next) => {
  try {
	  const { username, password } = req.validated;

	  const user = await User.findOne({username});

	  if(!user) throw {status: 400, message: "No such username"};
	  if(!bcrypt.compare(password, user.password)) throw { status: 400, message: "Bad password"}


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
