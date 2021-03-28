const { Router } = require('express');
const passport = require('passport');
const TaskController = require('../../controllers/v1/taskController');
const validationMiddleware = require('../../Middleware/validationMiddleware');
const {
  createTaskSchema,
  updateTaskSchema,
} = require('../../validations/TaskSchema');

const router = Router();

router.post(
  '/tasks',
  passport.authenticate('jwt', { session: false }),
  validationMiddleware(createTaskSchema),
  TaskController.createTask
);

router.patch(
  '/tasks/:id',
  passport.authenticate('jwt', { session: false }),
  validationMiddleware(updateTaskSchema),
  TaskController.updateTask
);

router.get(
  '/tasks/:id',
  passport.authenticate('jwt', { session: false }),
  TaskController.getTask
);

router.get(
  '/tasks',
  passport.authenticate('jwt', { session: false }),
  TaskController.getAllTasks
);
module.exports = router;
