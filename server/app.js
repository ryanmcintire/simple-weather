const express       = require('express'),
      http          = require('http'),
      path          = require('path'),
      bodyParser    = require('body-parser'),
      logger        = require('morgan'),
      handlebars    = require('express-handlebars'),
      flash         = require('connect-flash'),
      passport      = require('passport'),
      LocalStrategy = require('passport-local').Strategy;

const mongoose = require('./db/mongo_connect');

const routes  = require('./routes/index'),
      usersRoutes = require('./routes/users'),
      adminRoutes = require('./routes/admin'),
      citiesRoutes = require('./routes/cities');

//
//app setup
const app = express();

app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//logging and parsing
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//todo - granular body parsing.
app.use(bodyParser.json({type: '*/*'}));

app.use(express.static(path.join(__dirname, 'public')));


//
//routes
//app.use('/api', apiRoutes);
app.use('/users', usersRoutes);
app.use('/cities', citiesRoutes);
app.use('/admin', adminRoutes);
app.use('/*', routes);


//404
app.use(function (req, res, next) {
  var err    = new Error('Not Found');
  err.status = 404;
  next(err);
});

//
//error handling
//
// if (app.get('env') === 'development') {
//   app.use(function (err, req, res, next) {
//     res.status(err.status || 500);
//     //todo - error template
//     res.render('error', {
//       message: err.message,
//       error: err
//     });
//   });
// }
//
// app.use(function (err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: {}
//   });
// });

console.log('Server listening on port 3000');
app.listen(3000);





