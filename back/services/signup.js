const passport = require('passport');
const router = require('express').Router();
var UserDao = require('../dao/userDao.js');
var config = require('../../config.json');
router.post('/local', (req, resp, next) => {
    UserDao.read(function (err, user) {
        if (user instanceof Array)
            user = user[0];

        if (err)
            return done(err);

        if (!user) {
            UserDao.create({
                email: req.body.email,
                password: req.body.password
            }, (err, newUser) => {
                if (err) {
                    // wrong form insides sended
                    resp.status(404).send("Cannot create user with this information");
                } else {
                    req.login(newUser, function (err) {
                        if (err) {
                            return next(err);
                        }
                        return resp.redirect('/user/' + req.user.id);
                    });

                }
            })


        } else {
            //user with rhis email already exists
            resp.status(403).send("user with this email already exists");
        }
    }, {
        email: req.body.email
    });
});



module.exports = router;