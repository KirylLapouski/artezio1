var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var config = require('../../../config.json');
var UserDao = require('../../dao/userDao.js');


passport.use(
    new FacebookStrategy({
        // options for google strategy
        clientID: config.facebook.clientID,
        clientSecret: config.facebook.clientSecret,
        callbackURL: 'https://localhost:3000/auth/facebook/redirect'
    }, (accessToken, refreshToken, profile, done) => {

        console.log(profile);
         // check if user already exists in our own db
            var checkUserExisting = function(currentUser) {
                currentUser = currentUser[0];
                if(currentUser){
                    // already have this user
                    console.log('user already logged in: ', currentUser);
                    done(null, currentUser);
                } else {
                    // if not, create user in our db
                    UserDao.create({
                        email: profile.emails[0].value,
                        firstName: profile.name.familyName,
                        lastName: profile.name.givenName,
                        linkedinId: profile.id,
                    },(err,newUser) => {
                            console.log('created new user: ', newUser);
                            done(null, newUser);
                    })
                }
            }

            UserDao.read(null,{linkedinId: profile.id}).then(checkUserExisting);
}));
