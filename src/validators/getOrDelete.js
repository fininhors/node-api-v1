const Joi = require("joi");

module.exports = {
    params: Joi.object({
        id: Joi.number().required(),
    }),
};
