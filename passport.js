const jwt = require('jsonwebtoken');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const db = require('./models');

const SECRET = 'bicycles and tricycles';
const sign = (payload) => jwt.sign(payload, SECRET);

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET
};

passport.use(new JwtStrategy(opts, async (payload, done) => {
  try {
    const user = await db.UserModel.findById(payload.id);
    return done(null, user);
  } catch (e) {
    return done(e, false);
  }
}));

module.exports = {
  sign,
  passport
}