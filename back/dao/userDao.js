var config = require('../etc/config.json');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//mongoose model
var userSchema = new Schema({
    username: String,
    password: String
});

const User = mongoose.model('user', userSchema);

class UserDao{
 //ERROR HANDLER
    create(user,callback){
        new User({
            googleId: user._id,
            username: user.password
        }).save().then((newUser,err) => {
            console.log('created new user: ', newUser);
            // do something
            callback(err,newUser)
        });
    }

    read(callback,id){
        console.log(id);
        User.find(id?{googleId: id}:{}).then((currentUser,err) => {
            if(callback)
                callback(err,currentUser);  
        });

    }

//CHECK SHEMA VALIDATION
    update(oldOne,newOne,callback){
        User.update(oldOne,newOne).then((result,err)=>{if(callback) callback(err,result)})
    }

    delete(id,callback){
        User.remove({googleId:id}).then((result,err)=>{
            if(callback)  callback(err,result);
        })
    }

}

module.exports = UserDao;