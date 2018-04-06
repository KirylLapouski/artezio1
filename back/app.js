var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
var fs = require('fs');

const fileUpload = require('express-fileupload');

//passport
var passport = require('passport');
const passportFacebookSetup = require('./services/passport/passportFacebookSetup');
const passportLinkedInSetup = require('./services/passport/passportLinkedinSetup');
const passportLocalSetup = require('./services/passport/passportLocalSetup');
//routers
var index = require('./services/index');
var dbUsers = require('./services/dbUsers');
var user = require('./services/user');
var admin = require('./services/admin');
var auth = require('./services/auth');
var signUp = require('./services/signup');



var config = require('../config.json');

var app = express();

// set up session cookies
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [config.cookieKey]
}));

app.use(fileUpload());

// view engine setup
app.set('views', path.join(__dirname+'../client', 'public'));
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

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname +'../client', 'public')));

//Custom services 
app.use('/', index);
app.use(config.dbApi, dbUsers);
app.use(config.userCabinet,user);
app.use(config.adminCabinet,admin);
app.use(config.auth,auth);
app.use(config.signUp,signUp);

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
mongoose.connect(config.db.remoteDbURI, (err) => {
  console.log('connected to mongodb');
});



/*var options = {
  key: fs.readFileSync('test/fixtures/keys/agent2-key.pem'),
  cert: fs.readFileSync('test/fixtures/keys/agent2-cert.cert')
};

const https = require('https').createServer(options,app);
const http = require('http').createServer(app);

http.listen(3000,() => console.log('PORT :: 3000'));
https.listen(4433,() => console.log('PORT :: 4433'));*/

module.exports = app;
