const router = require('express').Router();
const passport = require('passport');

// auth login
router.get('/login', (req, res) => {
    res.render('login', { user: req.user });
});

// auth logout
router.get('/logout', (req, res) => {
    console.log('loggin out');
    req.logout();
    res.redirect('/');
});

// auth with facebook
router.get('/facebook', passport.authenticate('facebook', {
    scope: ['public_profile']
}));

// callback route for facebook to redirect to
// hand control to passport to use code to grab profile info
router.get('/facebook/redirect', passport.authenticate('facebook'), (req, res) => {
    if (req.secure) {
        
    } else {
        //MUST BE HTTPS
       // res.redirect(301, 'https://example.com/route');
    }
    res.send(req.user);
});

// auth with linkedin
router.get('/linkedin', passport.authenticate('linkedin', {scope: ['r_basicprofile','r_emailaddress']}));

// callback route for linkedin to redirect to
// hand control to passport to use code to grab profile info
router.get('/linkedin/redirect', passport.authenticate('linkedin'), (req, res) => {
    res.redirect('/user/'+req.user.id);
});

//local auth
router.post('/local',passport.authenticate('local',{ failureRedirect: '/'}),(req,resp)=>{resp.send(req.body)});



module.exports = router;