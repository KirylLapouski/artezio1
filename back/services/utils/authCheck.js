const authCheck = (req,resp,next)=>{
    if(!req.user){
        resp.redirect('/');
    }else{
        next();
    }
}

module.exports = authCheck;