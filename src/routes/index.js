const express = require("express");
const { validate, ValidationError } = require("express-validation");
const messages = require("joi-translation-pt-br");

const verifyToken = require("../middlewares/auth");
const AuthController = require("../controllers/AuthController");
const StudentController = require("../controllers/StudentController");
const validators = require("../validators");

const makeValidation = (validation) =>
    validate(validation, {}, { abortEarly: false, messages: messages });

const router = express.Router();

router.post("/register", AuthController.create);
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
