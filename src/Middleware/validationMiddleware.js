const response = require('../utils/ResponseGenerator');

const validationMiddleware = (schema) => async (req, res, next) => {
  try {
    if (!schema) {
      response.sendError(res, 500, 'schema is undefine');
    }

    await schema.validate(req.body, { abortEarly: false });
    next();
  } catch ({ errors }) {
    response.sendError(res, 400, errors);
  }
};

module.exports = validationMiddleware;
