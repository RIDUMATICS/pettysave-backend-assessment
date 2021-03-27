const response = require('../../utils/ResponseGenerator');
const { Task } = require('../../database/models');

/**
 * task controller
 */
class TaskController {
  /**
   * @description Create a new task
   * @param {object} req express request object
   * @param {object} res express request object
   * @returns {json} json
   * @memberof TaskController
   */
  static async createTask(req, res) {
    const { id } = req.user; // get the user id
    const newTask = await Task.create({ ...req.body, user_id: id });

    response.sendSuccess(
      res,
      201,
      { task: newTask },
      'Task created successfully'
    );
  }
}

module.exports = TaskController;
