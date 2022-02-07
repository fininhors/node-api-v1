const Joi = require("joi");

module.exports = {
    body: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        ra: Joi.string().required(),
        cpf: Joi.string()
            .length(14)
            .pattern(/^\d{3}\x2E\d{3}\x2E\d{3}\x2D\d{2}$/)
            .required(),
    }),
};
