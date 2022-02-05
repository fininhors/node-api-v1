const Joi = require("joi");

module.exports = {
    body: {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        ra: Joi.number().required(),
        cpf: Joi.number().required(),
    },
};
