//CHANGE PARAMETRES ORDER
var config = require('../etc/config.json');
var User = require('./userModel');

var UserDao = {
        //ERROR HANDLER
        create:(user,callback)=>{
           return new User(user).save().then((newUser,err) => {
                console.log('created new user: ', newUser);
                // do something
                callback(err,newUser)

                return newUser;
            });
        },

        read:(callback,id)=>{
            return User.find(typeof id == "number"?{_id: id}:id?id:{}).then((currentUser,err) => {
                if(callback)
                    callback(err,currentUser);  
                return currentUser;
            });
        },

        //CHECK SHEMA VALIDATION
        update:(oldOne,newOne,callback)=>{
            return User.update(oldOne,newOne).then((result,err)=>{
                if(callback) callback(err,result)
                return result;
            })
        },

        delete:(id,callback)=>{
           return User.remove({_id:id}).then((result,err)=>{
                if(callback)  callback(err,result);
                return result;
            })
        }

}

module.exports = UserDao;