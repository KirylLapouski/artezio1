//CHANGE PARAMETRES ORDER
var config = require('../etc/config.json');
var User = require('./userModel');

var UserDao = {
        //ERROR HANDLER
        create:(user,callback)=>{
           return new User(user).save().then((newUser) => {
                console.log('created new user: ');
                // do something
                callback(null,newUser);

                return newUser;
            },(err)=>{
                console.log("failed to create a new user");
                callback(err)});
        },

        read:(callback,id)=>{
             return User.find(typeof id == "string"?{_id: id}:id).then((currentUser,err) => {
                currentUser = currentUser?(currentUser.length==1?currentUser[0]:currentUser):currentUser;
                if(callback)
                    callback(err,currentUser);  
                return currentUser;
            },(err)=>{
                console.log("failed to read user");
                callback(err);});
        },

        //CHECK SHEMA VALIDATION
        update:(oldOne,newOne,callback)=>{
            return User.update(oldOne,newOne).then((result,err)=>{
                if(callback) callback(err,result)
                return result;
            },(err)=>{
                console.log("failed to update a user");
                callback(err)})
        },

        delete:(id,callback)=>{
           return User.remove({_id:id}).then((result,err)=>{
                if(callback)  callback(err,result);
                return result;
            },(err)=>{
                console.log("fail to delete a user");
                callback(err)})
        }

}

module.exports = UserDao;