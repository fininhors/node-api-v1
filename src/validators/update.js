const Joi = require("joi");

module.exports = {
    body: Joi.object({
        name: Joi.string(),
        email: Joi.string().email(),
    }),
    params: Joi.object({
        id: Joi.number().required(),
    }),
};
