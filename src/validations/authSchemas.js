const { object, string, ref } = require('yup');

const createUserSchema = object().shape({
  first_name: string().required(),
  last_name: string().required(),
  address: string().required(),
  email: string().email().required(),
  password: string().required().min(8),
  confirm_password: string()
    .required()
    .oneOf([ref('password'), null], 'Passwords must match'),
});

module.exports = {
  createUserSchema,
};
