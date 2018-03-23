var express = require('express');
var bodyParser = require("body-parser");
var fs = require("fs");
var UserDao = require('../dao/userDao');

var router = express.Router();
var jsonParser = bodyParser.json();
var userDao = new UserDao();
//CHECK CONNECTION

router.route("/")
.get(function(req,resp){
    userDao.read(function(err,data){
        //HANDLE ERROR


        console.log('send all users:');
        console.log(JSON.stringify(data));
        resp.send(JSON.stringify(data));
    });
   
})
.post(function(req,resp){

    if(!req.body) return resp.status(404).send();

    var userName = req.body.userName;
    var password = req.body.password;

    var user = {"_id":userName, "password": password}

    userDao.create(user,function(err,data){
        //HANDLE ERR


        console.log('send added user:');
        console.log(data);
        resp.send(JSON.stringify(data));
    })
})
.put(function(req,resp){
    //NEED TO CHECH

   if(Object.keys(req.body)==0) 
   {
        resp.sendStatus(404);
        return;
   }
 
    var userId = req.body.userName;
    var newProps = Object.assign({},req.body);
    delete newProps.userName;

    userDao.update({_id:userId},newProps, function(err,data){
            //HANDLE ERR


                console.log('send updated user:');
                resp.send(JSON.stringify(data));
        });
});

router.route("/:name")
.get( function(req,resp){

    userDao.read(function(err,data){
        //HANDLE ERR

        console.log('send user:');
        console.log(data);
        resp.send(JSON.stringify(data));
    },req.params.name);
})
.delete(function(req,resp){
    userDao.delete(req.params.name, function(err,data){
        //HANDLE ERR

        console.log('send deleted user');
        console.log(data);
        resp.send(JSON.stringify(data.result));
    })
});

router.route("/:name/:task")
.delete( function(req,resp){
    
}
)

module.exports = router;
