var express = require('express');
var bodyParser = require("body-parser");
var fs = require('fs');
var  XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

var router = express.Router();

router.route('/')
.post(function(req,resp){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', "http://localhost:3000/db/users/byName/"+req.body.userName, true);
    xhr.send();

   
    xhr.onload = function(){
        
        if(this.status==200)
        {
            
                var user = JSON.parse(this.responseText);
                console.log(req.body.password+" "+ req.body.userName);
                console.log(user.name + " "+ user.password);
                if(user.password == req.body.password)
                {
                    resp.redirect('user/'+user.id);
                }
                else{
                    //ОШИБКА
                    resp.end();
                }
        }else{
           //ОШИБКА
        }
    }
});

router.route('/:id')
.get(function(req,resp){
    
    fs.readFile('public/user.html','utf-8',function(err,data){
                        if(err) throw err;
        
                        resp.cookie('userId', req.params.id);
                        resp.send(data);
                     
                    });
})
module.exports = router;