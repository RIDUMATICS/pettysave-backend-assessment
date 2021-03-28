const express = require('express');
// eslint-disable-next-line import/no-extraneous-dependencies
const morgan = require('morgan');
const helmet = require('helmet');
const passport = require('passport');
const swaggerUi = require('swagger-ui-express');
const authRouter = require('./routes/auth');
const taskRouter = require('./routes/v1/task');
const passportConfig = require('./config/passport');
const swaggerDocumentV1 = require('../swagger.v1.json');

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());
app.use(passport.initialize());

passportConfig(passport);

app.use('/auth', authRouter);

app.use('/api/v1', taskRouter);

// route for swagger documentation
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocumentV1));

app.all('*', (request, response) => {
  response.status(404).json({
    status: 'error',
    error: 'resource not found',
  });
});

module.exports = app;
