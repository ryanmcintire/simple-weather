const passport      = require('passport'),
      JwtStrategy   = require('passport-jwt').Strategy,
      ExtractJwt    = require('passport-jwt').ExtractJwt,
      LocalStrategy = require('passport-local').Strategy;

const User   = require('../models/user'),
      config = require('../config');

const optionsLocal = {usernameField: 'email'};
module.exports.localStrategy = new LocalStrategy(optionsLocal, function(email, password, done) {
  User.findOne({email: email}, function(err, user) {
    if (err) {return done(err);}
    if (!user) {return done(null, false);}

    user.passwordCompare(password, function(err, isMatch) {
      if (err) {return done(err);}
      if (!isMatch) return done(null, false);
      return done(null, user);
    })
  });
});

const optionsJwt = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.jwtSecret
};

module.exports.jwtStrategy = new JwtStrategy(optionsJwt, function(payload, done) {
  User.findById(payload.sub, function(err, user) {
    if (err) {return done(err, false);}
    if (user) { done(null, user); }
    else { done(null, false); }
  })
});
