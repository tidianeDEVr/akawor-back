const passport = require("passport");
const passportJwt = require("passport-jwt");
const config = require("../config/config.json");
const ExtractJwt = passportJwt.ExtractJwt;
const StrategyJwt = passportJwt.Strategy;
const { user } = require("../models/");

passport.use(
  new StrategyJwt({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.JWT_SECRET,
  },
  (jwtPayload, done) => {
    return user
      .findOne({ where: { id: jwtPayload.id } })
      .then((user) => {
        return done(null, user);
      })
      .catch((err) => {
        return done(err);
      });
  })
);
