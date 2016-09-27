const router   = require('express').Router(),
      passport = require('passport');

passport.use(require('../services/passport').localStrategy);
passport.use(require('../services/passport').jwtStrategy);

const signinGateway = passport.authenticate('local', {session: false}),
      jwtGateway = passport.authenticate('jwt', {session: false});

const authentication  = require('../middlewares/authentication');

router.post('/signup', authentication.signup);
router.post('/signin', signinGateway, authentication.signin);

router.get('/user-info', jwtGateway, function(req, res) {
  resBody = {
    email: req.user.email,
    cities: req.user.cities
  };
  res.send(resBody);
});

router.get('/testing', jwtGateway, function(req, res) {
  console.log(req.user.admin);
  res.send({message: 'this works...'});
});

module.exports = router;
