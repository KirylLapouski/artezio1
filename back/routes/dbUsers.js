var express = require('express');
var bodyParser = require("body-parser");
var fs = require("fs");


var router = express.Router();
var jsonParser = bodyParser.json();

/* GET users listing. */

router.route("/")
.get(function(req,resp){
    fs.readFile("users.json","utf-8",function(err,data){
        if(err) throw err;

        resp.send(data);
    });
   
})
.post(jsonParser,function(req,resp){

    if(!req.body) return resp.status(404).send();

    var userName = req.body.userName;
    var password = req.body.password;

    var user = {"_id":userName, "password": password}

    fs.readFile("users.json","utf-8",function(err,data){
        if(err) throw err;

        var users = JSON.parse(data);
        
        users.push(user);
        var data = JSON.stringify(users);

        fs.writeFile("users.json",data,function(err,data){
            if(err) throw err;

            resp.send(JSON.stringify(user));
        });

    })
})
.put(jsonParser,function(req,resp){
    if(!req.body) return resp.sendStatus(404);

    var userName = req.body.userName;
    var password = req.body.password;

    fs.readFile("users.json","utf-8", function(err,data){
        if(err) throw err;

        var users = JSON.parse(data);
        var user;
        for(var i=0; i< users.length;i++){
            if(users[i]._id == userName){
                user = users[i];
                break;
            }
        }

        if(user){
            user._id = userName;
            user.password =  password;

            fs.writeFile("users.json",JSON.stringify(users),function(req,resp){
                resp.send(JSON.stringify(user));
            });
        }else{
            resp.sendStatus(404);
        }
    })
});

router.route("/:id")
.get( function(req,resp){
    fs.readFile("users.json","utf-8",function(err,data){
        if(err) throw err;

        var users = JSON.parse(data);
        var user;

        for(var i=0;i< users.length;i++){
            if(req.params.id == users[i]._id){
                user = users[i];
                break;
            }
        }

        if(user){
            resp.send(JSON.stringify(user));
        }else{
            resp.sendStatus(404);
        }
    })
})
.delete(function(req,resp){
    fs.readFile("users.json", "utf-8", function(err,data){
        if(err) throw err;

        var users = JSON.parse(data);
        var user;
        var data = users.filter(function(value){
            if(value._id == req.body.id){
                user = value;
                return false;
            }
                return true;
        });

        if(user){
            fs.writeFile("users.json", data, function(err,data){
                if(err) throw err;
                resp.send(JSON.stringify(user));
            });
        }else{
            resp.sendStatus(404);
        }
    })
});

router.route("/byName/:name")
.get(function(req,resp){
//ROUTE /:id
    fs.readFile("users.json", "utf-8", function(err,data){
        if(err) throw err;

        var users = JSON.parse(data);
        var user;
        for(let i=0;i< users.length;i++){
            if(users[i].name == req.params.name)
                user = users[i];
        }

        if(user)
            resp.send(JSON.stringify(user));
        else
            resp.sendStatus(404);

    });
});
module.exports = router;
