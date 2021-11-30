const Joi = require("joi");

const registerSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(15).required(),
  password: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().required(),
});

const loginSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(15).required(),
  password: Joi.string().min(3).max(20).required(),
});

module.exports.validateRegister = async (req, res, next) => {
  try {
    value = await registerSchema.validateAsync(req.body);
    req.validated = value;
    next();
  } catch (error) {
    if (error.name === "ValidationError")
      next({ status: 400, message: error.details[0].message });
    next(error);
  }
};

module.exports.validateLogin = async (req, res, next) => {
  try {
    const value = await loginSchema.validateAsync(req.body);
    req.validated = value;
    next();
  } catch (error) {
    if (error.name === "ValidationError")
      next({ status: 400, message: error.details[0].message });
    else next(error);
  }
};
