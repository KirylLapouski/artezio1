require('babel-register')({
    presets:['react']
});

var express = require('express');
var bodyParser = require("body-parser");
var fs = require('fs');
var  XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
var config = require('../etc/config.json');
const cheerio = require('cheerio');
var React = require('react');
var ReactDOMServer = require('react-dom/server');
var TaskContainer = require('../views/components/TaskContainer.jsx');

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
                console.log(user);

                if(user.password == req.body.password)
                {
                    
                    fs.readFile('public/user.html','utf-8',function(err,data){
                        if(err) throw err;         
                        //RENDER 
                        var $ = cheerio.load(data);
                        $('#task').append(ReactDOMServer.renderToString(React.createElement(TaskContainer, user)));         

                        resp.cookie('userName', user._id);
                        resp.send($.html());
                     
                    });
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