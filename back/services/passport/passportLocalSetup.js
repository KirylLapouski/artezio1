var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
var config = require('../../etc/config');
var UserDao = require('../../dao/userDao.js');

passport.use(new LocalStrategy({
    usernameField: 'mail',
    passwordField: 'password',
    passReqToCallback : true
  },
    function(req,mail, password, done) {
        UserDao.read( function(err, user) {
            user=user[0];

            
            if (err) { return done(err); }
            if (!user) {
              return done(null, false, { message: 'Incorrect mail.' });
            }
            if (user.password!=password) {
              return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
          },{ email: mail });
    }
  ));