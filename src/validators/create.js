const Joi = require("joi");

module.exports = {
    body: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        ra: Joi.string().alphanum().required(),
        cpf: Joi.string().alphanum().length(14).required(),
    }),
};
