/* eslint-disable camelcase */
const { object: obj, string } = require('yup');
const response = require('../../utils/ResponseGenerator');
const { Task } = require('../../database/models');
const { User } = require('../../database/models');

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
   * @description Update task
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

  /**
   * @description Fetch a task by id
   * @param {object} req express request object
   * @param {object} res express request object
   * @returns {json} json
   * @memberof TaskController
   */
  static async getTask(req, res) {
    try {
      const { id: user_id } = req.user; // get the user id
      const { id } = req.params;

      const task = await Task.findOne({
        where: { id, user_id }, // only fetch task if user is the owner
        include: {
          // include owner details
          model: User,
          as: 'user',
        },
      });

      if (!task) {
        const error = new Error('Task not found');
        error.status = 404;
        throw error;
      }

      response.sendSuccess(res, 200, { task }, 'Task fetched successfully');
    } catch (error) {
      error.status = error.status || 500;
      response.sendError(res, error.status, error.message);
    }
  }

  /**
   * @description Fetch all user's task
   * @param {object} req express request object
   * @param {object} res express request object
   * @returns {json} json
   * @memberof TaskController
   */
  static async getAllTasks(req, res) {
    try {
      // schema for req.params
      const schema = obj({
        status: string().oneOf(['pending', 'in-progress', 'completed']),
      });

      await schema.validate(req.query);

      const opts = { user_id: req.user.id };

      if (req.query.status) {
        // check if status is not undefine
        opts.status = req.query.status;
      }

      const tasks = await Task.findAll({
        where: opts,
      });

      response.sendSuccess(res, 200, { tasks }, 'Task fetched successfully');
    } catch ({ errors }) {
      response.sendError(res, 400, errors);
    }
  }
}

module.exports = TaskController;
