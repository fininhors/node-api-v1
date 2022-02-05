const express = require("express");
// const { validate } = require("express-validation");
const Joi = require("joi");

const validator = require("express-joi-validation").createValidator({});

const getOrDeleteschema = Joi.object({
    id: Joi.number().integer().required(),
});

const createSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    ra: Joi.number().required(),
    cpf: Joi.number().required(),
});

// const createValidator = require("./validators/create");
// const getOrDeleteValidator = require("./validators/getOrDelete");
// const updateValidator = require("./validators/update");
const StudentController = require("../controllers/StudentController");

const router = express.Router();

router.post(
    "/students",
    validator.body(createSchema),
    StudentController.create
);
// router.get(
//     "/students",
//     validate(getOrDeleteValidator),
//     StudentController.index
// );
router.get(
    "/students/:id",
    validator.params(getOrDeleteschema),
    StudentController.show
);
// router.put(
//     "/students/:id",
//     validate(updateValidator),
//     StudentController.update
// );
// router.delete(
//     "/students/:id",
//     validate(getOrDeleteValidator),
//     StudentController.delete
// );

router.use((err, req, res, next) => {
    if (err && err.error && err.error.isJoi) {
        // we had a joi error, let's return a custom 400 json response
        res.status(400).json({
            type: err.type, // will be "query" here, but could be "headers", "body", or "params"
            message: err.error.toString(),
        });
    } else {
        // pass on to another error handler
        next(err);
    }
});

module.exports = router;
