var passport = require('passport');
var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
var config = require('../../../config');
var UserDao = require('../../dao/userDao.js');
var toastr = require('toastr');
var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    UserDao.read((err, user) => {
        done(null, user);
    }, id);
});

passport.use(
    new LinkedInStrategy({
        // options for linkedin strategy
        clientID: config.linkedin.clientID,
        clientSecret: config.linkedin.clientSecret,
        callbackURL: 'http://localhost:3000/auth/linkedin/redirect',
        scope: ['r_emailaddress', 'r_basicprofile']
    }, (accessToken, refreshToken, profile, done) => {
        // check if user already exists in our own db
        var checkUserExisting = function (err, currentUser) {

            if (JSON.stringify(currentUser) == "[]") {
                // if not, create user in our db
                UserDao.create({
                    email: profile.emails[0].value,
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                    linkedinId: profile.id,
                }, (err, newUser) => {
                    console.log('created new user: ');
                    done(null, newUser);
                    /*
                    var xhr = new XMLHttpRequest();
                    xhr.open('GET',profile.photos[0].value,false);
                    xhr.send();
                    var response =xhr.response;
                    //save photo 

                    var data = new FormData();
                    data.append('file', response);

                    var xhr = new XMLHttpRequest();
                    xhr.onload = xhr.onerror = function() {
                        console.log('created new user: ');
                        done(null, newUser);
                        if (this.status == 200) {
                            toastr.success("Image was loaded");
                        } else {
                            toastr.error("Error when load image");
                            }
                    };

                    xhr.open("POST",config.dbApi +"/"+ newUser._id +"/image", true);
                    xhr.send(data);
                    */

                })
            } else {
                if (currentUser instanceof Array)
                    currentUser = currentUser[0];

                // already have this user
                console.log('user already in database: ');
                done(null, currentUser);
            }
        }

        UserDao.read(checkUserExisting, {
            linkedinId: profile.id
        });
    })
);