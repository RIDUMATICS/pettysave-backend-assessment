const express = require('express');
// eslint-disable-next-line import/no-extraneous-dependencies
const morgan = require('morgan');
const helmet = require('helmet');
const passport = require('passport');
const authRouter = require('./routes/auth');
const taskRouter = require('./routes/v1/task');
const passportConfig = require('./config/passport');

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());
app.use(passport.initialize());

passportConfig(passport);

app.use('/auth', authRouter);

// Plug in the JWT strategy as a middleware so only verified users can access this route.
app.use('/api/v1', passport.authenticate('jwt', { session: false }), taskRouter);

app.all('*', (request, response) => {
  response.status(404).json({
    status: 'error',
    error: 'resource not found',
  });
});

module.exports = app;
