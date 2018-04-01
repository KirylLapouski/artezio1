var express = require('express');
var bodyParser = require("body-parser");
var fs = require("fs");
var userDao = require('../dao/userDao');
var user = require('../dao/userModel.js')
var router = express.Router();
var jsonParser = bodyParser.json();

//CHECK CONNECTION


router.route("/")
.get(function(req,resp){
    userDao.read(function(err,data){
        //HANDLE ERROR


        console.log('send all users:');
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
                if(err) {
                    resp.sendStatus(404);
                }else{
                    console.log('send updated user:');
                    resp.send(JSON.stringify(data));
                }
        });
});

router.route("/getEnteredUser")
.get(function(req,resp){
    console.log("send entered user");

    var user ={};
    user._id = req.user._id;
    user.email = req.user.email;
    user.firstName = req.user.firstName;
    user.lastName = req.user.lastName;
    user.phoneNumber = req.user.phoneNumber;
    user.city = req.user.city;
    resp.send(user);
})

router.route("/:id")
.get( function(req,resp){

    userDao.read(function(err,data){
        //HANDLE ERR

        console.log('send user:');
        resp.send(JSON.stringify(data));
    },req.params.id);
})
.delete(function(req,resp){
    userDao.delete(req.params.id, function(err,data){
        //HANDLE ERR

        console.log('send deleted user');
        resp.send(JSON.stringify(data.result));
    })
});

router.route("/:id/image")
.get( function(req,res) {
    console.log("send user image");
    user.findOne({ _id:req.params.id },function(err,user) {
        if(JSON.stringify(user.img) == "{}"){
            console.log("This user does not have photo");
            res.status("404").send("User does not have an image");
        }else{
            res.set("Content-Type", "image/jpg");
            res.send(user.img.data);
        }
    });
})
.post(
    function(req,resp){
        console.log("save user image");
        var userImage = {};
        userImage.img = {};
        userImage.img.data =req.files.file.data;
        userImage.img.contentType = req.files.file.mimetype;
        userDao.update({_id:req.user.id},userImage,(err,data)=>{
            if(err) {
                resp.sendStatus(404);
            }else{
                console.log('send updated user:');
                resp.send(JSON.stringify(data));
            }
        })
    }
)


/*router.route("/:name/:task")
.delete( function(req,resp){
    
}
)
*/

module.exports = router;
