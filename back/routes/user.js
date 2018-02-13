//REFACTOR ADMIN TO USER
require('babel-register')({
    presets:['react']
});

var express = require('express');
var  XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
var fs = require('fs');
var config = require('../etc/config.json');
const cheerio = require('cheerio');
var React = require('react');
var ReactDOMServer = require('react-dom/server');
var TaskContainer = require('../views/components/TaskContainer');
var NavBar = require('./../views/components/NavBar');

var router = express.Router();

router.route('/')
.post(function(req,resp){
    
    var xhr = new XMLHttpRequest();
    xhr.open('GET', config.rootUrl+config.dbApi+'/'+req.body.userName, true);
    xhr.send();
    
    xhr.onload = function(){
        if(this.status==200)
        {
                var user = JSON.parse(this.responseText);

                if(user.password == req.body.password)
                {
                    if(user.isAdmin)
                    {
                        resp.redirect(307,config.rootUrl+config.adminCabinet);
                    }else{
                    
                            fs.readFile('public/user.html','utf-8',function(err,data){
                                if(err) throw err;         
                                //RENDER 
                                var $ = cheerio.load(data);
                                $('body').prepend(ReactDOMServer.renderToString(React.createElement(NavBar,{menuItems:[{name:'Home'}],userName:req.body.userName})))                                
                                $('#tasks').append(ReactDOMServer.renderToString(React.createElement(TaskContainer, user)));         
                                resp.send($.html());
                        });
                    }
                    
			//HAVE TO CHECK
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

module.exports = router;