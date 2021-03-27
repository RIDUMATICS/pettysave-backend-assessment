const express = require('express');
// eslint-disable-next-line import/no-extraneous-dependencies
const morgan = require('morgan');
const helmet = require('helmet');
const authRouter = require('./routes/v1/auth');

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());

app.use('/auth', authRouter);

app.all('*', (request, response) => {
  response.status(404).json({
    status: 'error',
    error: 'resource not found',
  });
});

module.exports = app;
