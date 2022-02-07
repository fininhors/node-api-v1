const express = require('express');
const { validate, ValidationError } = require('express-validation');

const StudentController = require('../controllers/StudentController');
const validators = require('./validators');

const router = express.Router();

router.post('/students', validate(validators.create), StudentController.create);

router.get('/students', StudentController.index);

router.get(
  '/students/:id',
  validate(validators.getOrDelete),
  StudentController.show
);

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
});

module.exports = router;
