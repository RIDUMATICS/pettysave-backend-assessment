const response = require('../../utils/ResponseGenerator');
const { User } = require('../../database/models');

/**
 * user controller performs user signup, sign-in, verify 2FA token and create staff logic
 */
class AuthController {
  /**
   * @param {object} req express request object
   * @param {object} res express request object
   * @returns {json} json
   * @memberof UserController
   */
  static async createUser(req, res) {
    try {
      const user = await User.findOne({ where: { email: req.body.email } });
      if (user) {
        return response.sendError(res, 409, 'Email has already been taken.');
      }

      const newUser = await User.create(req.body);

      return response.sendSuccess(res, 201, newUser);
    } catch (error) {
      error.status = error.status || 500;
      return response.sendError(res, error.status, error.message);
    }
  }
}

module.exports = AuthController;
