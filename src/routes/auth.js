const { Router } = require('express');
const AuthController = require('../controllers/v1/authController');
const validationMiddleware = require('../Middleware/validationMiddleware');
const {
  createUserSchema,
  loginUserSchema,
} = require('../validations/authSchemas');

const router = Router();

router.post(
  '/signup',
  validationMiddleware(createUserSchema),
  AuthController.createUser
);

router.post(
  '/login',
  validationMiddleware(loginUserSchema),
  AuthController.loginUser
);

module.exports = router;
