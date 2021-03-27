const { object, string } = require('yup');

const createTaskSchema = object().shape({
  title: string().trim().min(2).max(25)
    .required(),
  description: string().trim().min(5).required(),
  status: string().required().oneOf(['pending', 'in-progress', 'completed']),
});

const updateTaskSchema = object().shape({
  title: string().trim().min(2).max(25),
  description: string().trim().min(5),
  status: string().oneOf(['pending', 'in-progress', 'completed']),
});

module.exports = {
  createTaskSchema,
  updateTaskSchema,
};
