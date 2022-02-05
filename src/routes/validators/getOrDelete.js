const Joi = require("joi");

const schema = Joi.object({
    id: Joi.number().integer().required(),
});

module.exports = {
    schema,
};
