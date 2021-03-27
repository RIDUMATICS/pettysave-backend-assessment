/* eslint-disable camelcase */
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

  /**
   * @description Create a new task
   * @param {object} req express request object
   * @param {object} res express request object
   * @returns {json} json
   * @memberof TaskController
   */
  static async updateTask(req, res) {
    try {
      const { id: user_id } = req.user; // get the user id
      const { id } = req.params;
      const task = await Task.findOne({
        where: {
          id,
          user_id,
        },
      });

      // task not found
      if (!task) {
        const error = new Error('Task not found');
        error.status = 404;
        throw error;
      }

      const updatedTask = await task.update(req.body);

      response.sendSuccess(
        res,
        200,
        { task: updatedTask },
        'Task updated successfully'
      );
    } catch (error) {
      error.status = error.status || 500;
      response.sendError(res, error.status, error.message);
    }
  }
}

module.exports = TaskController;
