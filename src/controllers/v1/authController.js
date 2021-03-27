const response = require('../../utils/ResponseGenerator');
const { User } = require('../../database/models');

/**
 * user controller performs user signup, sign-in, verify 2FA token and create staff logic
 */
class AuthController {
  /**
   * @description Create a new user
   * @param {object} req express request object
   * @param {object} res express request object
   * @returns {json} json
   * @memberof AuthController
   */
  static async createUser(req, res) {
    try {
      const email = req.body.email.toLowerCase();
      const user = await User.findOne({ where: { email } });
      if (user) {
        // throw error email is unique
        const error = new Error('Email has already been taken.');
        error.status = 409;
        throw error;
      }

      const newUser = await User.create(req.body);
      const token = newUser.generateToken();

      response.sendSuccess(
        res,
        201,
        { user: newUser, token },
        'Registration was successful'
      );
    } catch (error) {
      error.status = error.status || 500;
      response.sendError(res, error.status, error.message);
    }
  }

  /**
   * @description Signs user into their account
   * @param {object} req express request object
   * @param {object} res express request object
   * @returns {json} json
   * @memberof AuthController
   */
  static async loginUser(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({
        where: { email: email.toLowerCase() },
      });

      // if user exits
      if (user) {
        const isValid = await user.validatePassword(password);
        // if user password is valid
        if (isValid) {
          const token = user.generateToken();
          response.sendSuccess(
            res,
            200,
            { token, user },
            'LogIn was successful'
          );
        }
      }

      const error = new Error(
        'Email or password you entered did not match our records'
      );
      error.status = 404;
      throw error;
    } catch (error) {
      error.status = error.status || 500;
      response.sendError(res, error.status, error.message);
    }
  }
}

module.exports = AuthController;
