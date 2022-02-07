<<<<<<< HEAD
const express = require("express");
const { validate, ValidationError } = require("express-validation");

const StudentController = require("../controllers/StudentController");
const validators = require("../validators");
=======
const express = require('express');
const { validate, ValidationError } = require('express-validation');

const StudentController = require('../controllers/StudentController');
const validators = require('./validators');

const router = express.Router();

router.post('/students', validate(validators.create), StudentController.create);

router.get('/students', StudentController.index);
>>>>>>> 404718bf1dd402b2a7ae6e39e1d4f766f1e45ecf

router.get(
  '/students/:id',
  validate(validators.getOrDelete),
  StudentController.show
);

<<<<<<< HEAD
router.post("/students", validate(validators.create), StudentController.create);
router.get("/students", StudentController.index);
router.get(
    "/students/:id",
    validate(validators.getOrDelete),
    StudentController.show
);
router.put(
    "/students/:id",
    validate(validators.update),
    StudentController.update
);
router.delete(
    "/students/:id",
    validate(validators.getOrDelete),
    StudentController.delete
);

router.use((err, req, res) => {
    if (err instanceof ValidationError) {
        return res.status(err.statusCode).json(err);
    }

    return res.status(500).json({
        type: err.type, // will be "query" here, but could be "headers", "body", or "params"
        message: err.error.toString(),
    });
=======
router.put(
  '/students/:id',
  validate(validators.update),
  StudentController.update
);

router.delete(
  '/students/:id',
  validate(validators.getOrDelete),
  StudentController.delete
);

router.use((err, req, res) => {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json(err);
  }

  return res.status(500).json(err);
>>>>>>> 404718bf1dd402b2a7ae6e39e1d4f766f1e45ecf
});

module.exports = router;
