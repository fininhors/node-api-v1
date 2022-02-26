const express = require("express");
const { validate, ValidationError } = require("express-validation");
const { celebrate, Joi, errors } = require("celebrate");
const { messages } = require("joi-translation-pt-br");

const verifyToken = require("../middlewares/auth");
const AuthController = require("../controllers/AuthController");
const StudentController = require("../controllers/StudentController");
const validators = require("../validators");

const makeValidation = (validation) =>
    validate(validation, {}, { abortEarly: false, messages: messages });

const RegisterValidation = celebrate({
    body: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().min(6).required(),
    }),
}, {
    abortEarly: false,
    messages: messages,
});

const router = express.Router();

router.post("/register", RegisterValidation, AuthController.register);
router.post("/login", AuthController.signin);

router.post(
    "/students",
    verifyToken,
    makeValidation(validators.create),
    StudentController.create
);
router.get("/students", verifyToken, StudentController.index);
router.get(
    "/students/:id",
    verifyToken,
    makeValidation(validators.getOrDelete),
    StudentController.show
);
router.put(
    "/students/:id",
    verifyToken,
    makeValidation(validators.update),
    StudentController.update
);
router.delete(
    "/students/:id",
    verifyToken,
    makeValidation(validators.getOrDelete),
    StudentController.delete
);

router.use(errors());
router.use((err, req, res, next) => {
    if (err instanceof ValidationError) {
        return res.status(err.statusCode).json(err);
    }

    return res.status(500).json({
        type: err.type,
        message: err.error.toString(),
    });
});

module.exports = router;

function customErrors() {
    const fieldNames = {
        email: 'endereço de e-mail',
        password: 'o campo de senha'
    };

    function replaceFieldNames(message) {
        const keys = Object.keys(fieldNames);
        let msg = message;
        keys.forEach((k) => {
            const regex = new RegExp(`\"${k}\"`, 'gi');
            msg = msg.replace(regex, String(fieldNames[k]));
        });
        return msg;
    }

    return (error, req, res, next) => {
        if (!isCelebrateError(error)) {
            return next(error);
        }
        // is a celebrate error
        const result = {
            error,
            messages: [],
        };
        for (const [segment, joiError] of error.details.entries()) {
            result.messages = joiError.details.map((err) => {
                return replaceFieldNames(err.message);
            });
        }
        return res.status(400).json(result);
    };
}
