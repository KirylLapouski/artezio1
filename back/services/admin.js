require('babel-register')({
    presets:['react']
});

var express = require('express');
var  XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
var config = require('../../config.json');
const cheerio = require('cheerio');
var fs = require('fs');
var React = require('react');
var ReactDOMServer = require('react-dom/server');
var TaskContainer = require('../../client/components/TaskContainer');
var NavBar = require('../../client/components/NavBar');

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

                if(user.password == req.body.password && user.isAdmin)
                {
                    var xhr = new XMLHttpRequest();
                    xhr.open('GET', config.rootUrl+config.dbApi, true);
                    xhr.send();
                    
                    xhr.onload = function(){
                        if(this.status==200)
                        {
                            var users = JSON.parse(this.responseText);

                            var usersRes = users.map(function(obj){
                                return React.createElement(TaskContainer, obj);
                            });
                            

                            fs.readFile('public/admin.html','utf-8',function(err,data){
                                if(err) throw err;         
                                //RENDER 
                                var $ = cheerio.load(data);
                                $('body').prepend(ReactDOMServer.renderToString(React.createElement(NavBar,{menuItems:[{name:'Home'},{name:'This'},{name:'those'},{name:'shop'}]})))                                        
                                $('#users').append(ReactDOMServer.renderToString(usersRes));         
                                resp.send($.html());
                             
                            });
                        }
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
    }
)

module.exports = router;    