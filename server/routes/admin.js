const router         = require('express').Router(),
      passport       = require('passport'),
      authentication = require('../middlewares/authentication');

passport.use(require('../services/passport').localStrategy);
passport.use(require('../services/passport').jwtStrategy);

const localAuthenticate = passport.authenticate('local', {session: false}),
      jwtAuthenticate   = passport.authenticate('jwt', {session: false});

router.get('/testing', jwtAuthenticate, function(req, res) {
  if (!req.user.admin) res.status(401).send('Unauthorized - admin');
  res.send({message: 'Greetings, administrator.'})
});

module.exports = router;
