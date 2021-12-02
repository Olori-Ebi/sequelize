import Joi from "joi";

const ValidateRegister = Joi.object({
  id: Joi.string(),
  first_name: Joi.string().min(3),
  last_name: Joi.string().min(3),
  email: Joi.string().email().lowercase().required(),
  address: Joi.string().lowercase().required().min(5),
  password: Joi.string().min(6).required(),
  phoneNumber: Joi.string().min(6).required(),
});

module.exports = ValidateRegister;
