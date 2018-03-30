const passport = require('passport');
const router = require('express').Router();
var UserDao = require('../dao/userDao.js');

router.post('/local',(req,resp)=>{
    UserDao.read( function(err, user) {
    user=user[0];

                                
    if (err) { return done(err); }
    if (!user) {
    UserDao.create({
         email:req.body.email,
         password: req.body.password},(err,newUser)=>{
                                            if(err) 
                                                resp.sendStatus(406);
                                            else                                
                                                resp.sendStatus(201)}
                                    )
                                }
                                    
                               /* if (user.password!=password) {
                                  return done(null, false, { message: 'Incorrect password.' });
                                }*/
                                //return done(null, user);
                              },{ email: req.body.email });
                        });



module.exports = router; 