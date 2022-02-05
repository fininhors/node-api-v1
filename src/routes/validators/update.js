const Joi = require("joi");

const updateValidator = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
});

module.exports = updateValidator;
// module.exports = {
//     body: {
//         name: Joi.string().required(),
//         email: Joi.string().email().required(),
//     },
//     params: {
//         id: Joi.number().required(),
//     },
// };
