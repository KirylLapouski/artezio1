var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
var fs = require('fs');
var passport = require('passport');
const passportSetup = require('./services/passport/passport-setup');
//routers
var index = require('./services/index');
var dbUsers = require('./services/dbUsers');
var user = require('./services/user');
var admin = require('./services/admin');
var auth = require('./services/auth');


//var store = require('./dao/getConnectionToDb.js').createStore();

var config = require('./etc/config.json');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

/*app.use(expressSession({
  'store': store,
  resave:false,
  saveUninitialized: true,
  secret: 'SuperPuperSecret'
}))*/


app.use(express.static(path.join(__dirname, 'public')));

//Custom services 
app.use('/', index);
app.use(config.dbApi, dbUsers);
app.use(config.userCabinet,user);
app.use(config.adminCabinet,admin);
app.use(config.auth,auth);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

// connect to mongodb
mongoose.connect(config.db.remoteDbURI, () => {
  console.log('connected to mongodb');
});

// set up session cookies
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [config.cookieKey]
}));
// initialize passport
app.use(passport.initialize());
app.use(passport.session());


module.exports = app;
