const Joi = require('joi');

const registerSchema = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(15)
    .required(),
  password: Joi.string()
    .min(3)
    .max(20)
    .required(),
  email: Joi.string()
    .email()
    .required(),
});

const loginSchema = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(15)
    .required(),
  password: Joi.string()
    .min(3)
    .max(20)
    .required(),
});

module.exports.validateRegister = async (req, res, next) => {
  try {
    const {value, error} = await registerSchema.validateAsync(req.body);
    if (error) throw {status: 400, message: error};
    req.validated = value;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports.validateLogin = async (req, res, next) => {
  try {
    const {value, error} = await validateLogin.validateAsync(req.body);
    if (error) throw {status: 400, message: error};
    req.validated = value;
    next();
  } catch (error) {
    next(error);
  }
};
