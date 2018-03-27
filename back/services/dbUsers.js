var express = require('express');
var bodyParser = require("body-parser");
var fs = require("fs");
var userDao = require('../dao/userDao');

var router = express.Router();
var jsonParser = bodyParser.json();
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

    var userEMail = req.body.userName;
    var password = req.body.password;

    var user = {"email":userEMail, "password": password}

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
    var userId = req.body._id;
    var newProps = Object.assign({},req.body);
    delete newProps._id;
    
    userDao.update({_id:userId},newProps, function(err,data){
            //HANDLE ERR


                console.log('send updated user:');
                resp.send(JSON.stringify(data));
        });
});

router.route("/:id")
.get( function(req,resp){

    userDao.read(function(err,data){
        //HANDLE ERR

        console.log('send user:');
        console.log(data);
        resp.send(JSON.stringify(data));
    },req.params.id);
})
.delete(function(req,resp){
    userDao.delete(req.params.id, function(err,data){
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
