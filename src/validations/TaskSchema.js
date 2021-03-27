const { object, string } = require('yup');

const createTaskSchema = object().shape({
  title: string().required(),
  description: string().required(),
  status: string().required().oneOf(['pending', 'in-progress', 'completed']),
});

module.exports = {
  createTaskSchema,
};
