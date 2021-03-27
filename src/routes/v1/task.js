const { Router } = require('express');
const TaskController = require('../../controllers/v1/taskController');
const validationMiddleware = require('../../Middleware/validationMiddleware');
const { createTaskSchema } = require('../../validations/TaskSchema');

const router = Router();

router.post(
  '/tasks',
  validationMiddleware(createTaskSchema),
  TaskController.createTask
);

module.exports = router;
