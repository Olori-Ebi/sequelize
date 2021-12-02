import Joi from "joi";

const ValidatePropertyAd = Joi.object({
  status: Joi.string().valid("sold", "available").default("available"),
  price: Joi.number().required(),
  state: Joi.string().lowercase().required(),
  city: Joi.string().lowercase().required().min(5),
  address: Joi.string().min(6).required(),
  type: Joi.string().min(6).required(),
});

module.exports = ValidatePropertyAd;
