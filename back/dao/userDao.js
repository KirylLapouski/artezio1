var config = require('../etc/config.json');
var mongoClient = require('mongodb').MongoClient;

class UserDao{
 //ERROR HANDLER
    create(user){
       mongoClient.connect('mongodb://'+config.db.host+':'+config.db.port+'/'+config.db.name, function(err,db){
           if(err) throw err;

            db.collection(config.db.collections.users).insert(user,function(err,result){
                if(err) throw err;

                console.log("was created new user");
                console.log(user);
                 db.close();
            });

        });
    }

    read(id){

        mongoClient.connect('mongodb://'+config.db.host+':'+config.db.port+'/'+config.db.name, function(err,db){
           if(err) throw err;

        
            db.collection(config.db.collections.users).find(id?{_id: id}: undefined).toArray( function(err,result){
                if(err) throw err;

                if(id)
                    result = result[0];
                
                console.log("get users:");
                console.log(result);

                db.close();     
                return result;                   
            });

        });
    }

//THIS TWO LEFT TO CHECK
    update(oldOne,newOne){
        mongoClient.connect('mongodb://'+config.db.host+':'+config.db.port+'/'+config.db.name, function(err,db){
            if(err) throw err;

            db.collection(config.db.collections.users).updateOne(old,newOne, function(err,result){
                if(err) throw err;

                console.log("was updated user with id" + result._id)
                db.close();
            }
            );
        })
    }

    delete(id){
        mongoClient.connect('mongodb://'+config.db.host+':'+config.db.port+'/'+config.db.name, function(err,db){
            if(err) throw err;     

            db.collection(config.db.collections.users).deleteOne({_id:id}, function(err,result){
                if(err) throw err;

                console.log("was deleted user with id " +result._id);
                db.close();
            })
        });
    }
}

module.exports = UserDao;