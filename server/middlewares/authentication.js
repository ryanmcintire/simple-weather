const jwt = require('jwt-simple');

const User   = require('../models/user'),
      config = require('../config');

function generateUserJwt(user) {
  return jwt.encode({
      sub: user.id,
      iat: new Date().getTime()
    },
    config.jwtSecret);
}

module.exports.signin = function(req, res, next) {
  console.log('made it here.');
  res.send({token: generateUserJwt(req.user)})
};

module.exports.signup = function(req, res, next) {

  const email = req.body.email.toLowerCase(),
        password = req.body.password,
        admin = req.body.admin || false;

  if (!email || !password) {
    return res.status(422).send({error: 'You must provide an email and password.'});
  }

  //todo - form validation

  //todo - check for errors

  User.findOne({'email':email}, function(err, existingUser) {
    console.log('made it to findone callback');
    if (err) {return next(err)}
    if (existingUser) {return res.status(422).send({error: 'User with that email address already exists.'})}

    const user = new User({
      email: email,
      password: password,
      admin: admin
    });

    User.createNewUser(user, function(err, user) {
      if (err) return next(err);
      res.json({token: generateUserJwt(user)});
    });

    console.log('created a new user');
    //
    // user.save(function(err) {
    //   console.log('at the save callback');
    //   if (err) {return next(err);}
    //   res.json({token: generateUserJwt(user)});
    // });
  });
};


