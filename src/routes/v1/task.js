const { Router } = require('express');
const TaskController = require('../../controllers/v1/taskController');
const validationMiddleware = require('../../Middleware/validationMiddleware');
const {
  createTaskSchema,
  updateTaskSchema,
} = require('../../validations/TaskSchema');

const router = Router();

router.post(
  '/tasks',
  validationMiddleware(createTaskSchema),
  TaskController.createTask
);

router.patch(
  '/tasks/:id',
  validationMiddleware(updateTaskSchema),
  TaskController.updateTask
);

router.get(
  '/tasks/:id',
  TaskController.getTask
);
module.exports = router;
