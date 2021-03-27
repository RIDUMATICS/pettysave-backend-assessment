const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const response = require('../utils/ResponseGenerator');
const { User } = require('../database/models');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.secretOrPrivateKey;

const passportConfig = (passport) => {
  passport.use(
    new JwtStrategy(opts, (jwtPayload, done) => {
      User.findByPk(jwtPayload.id)
        .then((user) => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch((err) => response(err));
    })
  );
};

module.exports = passportConfig;
