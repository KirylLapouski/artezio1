var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var config = require('../../etc/config');
var UserDao = require('../../dao/userDao.js');

passport.serializeUser((user,done)=>{
    done(null,user.id);
});

passport.deserializeUser(function(id,done){
    UserDao.read((user)=>{done(null,user);},userId);
});

passport.use(
    new FacebookStrategy({
        // options for google strategy
        clientID: config.facebook.clientID,
        clientSecret: config.facebook.clientSecret,
        callbackURL: '/auth/facebook/redirect'
    }, (accessToken, refreshToken, profile, done) => {
        // check if user already exists in our own db
        User.findOne({googleId: profile.id}).then((currentUser) => {
            if(currentUser){
                // already have this user
                console.log('user is: ', currentUser);
                done(null, currentUser);
            } else {
                // if not, create user in our db
                new User({
                    googleId: profile.id,
                    username: profile.displayName
                }).save().then((newUser) => {
                    console.log('created new user: ', newUser);
                    done(null, newUser);
                });
            }
        });
    })
);
