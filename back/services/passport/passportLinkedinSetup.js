var passport = require('passport');
var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
var config = require('../../etc/config');
var UserDao = require('../../dao/userDao.js');

passport.serializeUser((user,done)=>{
    done(null,user.id);
});

passport.deserializeUser(function(id,done){
    UserDao.read((err,user)=>{console.log('deserialize user'); done(null,user);},id);
});

passport.use(
    new LinkedInStrategy({
        // options for google strategy
        clientID: config.linkedin.clientID,
        clientSecret: config.linkedin.clientSecret,
        callbackURL: 'http://localhost:3000/auth/linkedin/redirect',
        profileFields: ['id', 'first-name', 'last-name', 'email-address']
    }, (accessToken, refreshToken, profile, done) => {
        // check if user already exists in our own db
        var checkUserExisting = function(currentUser) {
            if(currentUser){
                
                currentUser = currentUser[0];
                
                // already have this user
                console.log('user already in database: ', currentUser);
                done(null, currentUser);
            } else {
                // if not, create user in our db
                UserDao.create({
                    email: profile.emails[0].value,
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                    linkedinId: profile.id,
                },(err,newUser) => {
                    console.log('created new user: ', newUser);
                    done(null, newUser);
                })
            }
        }

        UserDao.read(checkUserExisting,{linkedinId: profile.id});
    })
);
