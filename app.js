var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
const passport = require('passport');
var cors=require('cors');
require('./models/db')
require('./passport');
var indexRouter = require('./routes/index');
var meRouter = require('./routes/me');
var userRouter = require('./routes/user');

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Authorization, Content-Type, Accept");
  next();
}
var app = express();
// app.use('/auth', auth);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors({origin:true,credentials: true}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(allowCrossDomain)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use('/', indexRouter);
app.use('/me',passport.authenticate('jwt', {session: false}), meRouter);
app.use('/user', userRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
