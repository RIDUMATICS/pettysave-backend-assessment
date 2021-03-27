const { object, string, ref } = require('yup');

const email = string().email().required();
const password = string().required().min(8);

const createUserSchema = object().shape({
  first_name: string().required(),
  last_name: string().required(),
  address: string().required(),
  email,
  password,
  confirm_password: string()
    .required()
    .oneOf([ref('password'), null], 'Passwords must match'),
});

const loginUserSchema = object().shape({
  email,
  password,
});

module.exports = {
  createUserSchema,
  loginUserSchema,
};
