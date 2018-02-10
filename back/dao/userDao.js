var config = require('../etc/config.json');
var mongoClient = require('mongodb').MongoClient;

class UserDao{
 //ERROR HANDLER
    create(user,callback){
       mongoClient.connect('mongodb://'+config.db.host+':'+config.db.port+'/'+config.db.name, function(err,db){
           if(err) throw err;

            db.collection(config.db.collections.users).insert(user,function(err,result){
                if(err) throw err;

                console.log("was created new user");
                console.log(user);
                 db.close();
                 callback(err,result.ops[0]);
            });

        });
    }

    read(callback,id){

        mongoClient.connect('mongodb://'+config.db.host+':'+config.db.port+'/'+config.db.name, function(err,db){
           if(err) throw err;

        
            db.collection(config.db.collections.users).find(id?{_id: id}: undefined).toArray( function(err,result){
                if(err) throw err;

                if(id)
                    result = result[0];
                
                console.log("get users:");
                console.log(result);

                db.close();   
                callback(err,result);  
            });

        });
    }

//CANNOT UPDATE _ID
    update(oldOne,newOne,callback){
        mongoClient.connect('mongodb://'+config.db.host+':'+config.db.port+'/'+config.db.name, function(err,db){
            if(err) throw err;

            db.collection(config.db.collections.users).update(oldOne,{$set:newOne}, function(err,result){
                if(err) throw err;

                console.log("was updated user with id " + oldOne._id)
                db.close();
                callback(err,result);
            }
            );
        })
    }

    delete(id,callback){
        mongoClient.connect('mongodb://'+config.db.host+':'+config.db.port+'/'+config.db.name, function(err,db){
            if(err) throw err;     

            db.collection(config.db.collections.users).deleteOne({_id:id}, function(err,result){
                if(err) throw err;

                console.log("was deleted user with id " +id);
                db.close();
                callback(err,result);
            })
        });
    }
}

module.exports = UserDao;