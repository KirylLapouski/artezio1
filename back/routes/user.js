var express = require('express');
var bodyParser = require("body-parser");
var fs = require('fs');
var  XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
var config = require('../etc/config.json');
var router = express.Router();

router.route('/')
.post(function(req,resp){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', config.rootUrl+config.dbApi+'/byName/'+req.body.userName, true);
    xhr.send();

   
    xhr.onload = function(){
        
        if(this.status==200)
        {
            
                var user = JSON.parse(this.responseText);
                console.log(req.body.password+" "+ req.body.userName);
                console.log(user._id + " "+ user.password);
                if(user.password == req.body.password)
                {
			//HAVE TO CHECK
                    resp.redirect(config.userCabinet+'/' +user._id);
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

router.route('/:name')
.get(function(req,resp){
    
    fs.readFile('public/user.html','utf-8',function(err,data){
                        if(err) throw err;
        
                        resp.cookie('userName', req.params.name);
                        resp.send(data);
                     
                    });
})
module.exports = router;