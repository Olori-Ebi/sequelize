import Joi from "joi";

const ValidateLogin = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(6).required(),
});

module.exports = ValidateLogin;
