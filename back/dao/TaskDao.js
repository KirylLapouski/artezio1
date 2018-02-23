var config = require('../etc/config.json');
var mongoClient = require('mongodb').MongoClient;

class TaskDao{
 //ERROR HANDLER
    create(user,task,callback){
       mongoClient.connect('mongodb://'+config.db.host+':'+config.db.port+'/'+config.db.name, function(err,db){
           if(err) throw err;

            db.collection(config.db.collections.users).updateOne(user,{$push:{"tasks":task}}, function(err,result){
                if(err) throw err;

                console.log("was added new task");
                console.log(task);
                 db.close();
                 if(callback)callback(err,result);
            });

        });
    }

  /*  read(callback,id){

        mongoClient.connect('mongodb://'+config.db.host+':'+config.db.port+'/'+config.db.name, function(err,db){
           if(err) throw err;

        
            db.collection(config.db.collections.users).find(id?{_id: id}: undefined).toArray( function(err,result){
                if(err) throw err;

                if(id)
                    result = result[0];
                
                console.log("get users:");
                console.log(result);

                db.close();   
                if(callback)callback(err,result);  
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
                if(callback)callback(err,result);
            }
            );
        })
    }*/

    delete(userId,taskNumber,callback){
        mongoClient.connect('mongodb://'+config.db.host+':'+config.db.port+'/'+config.db.name, function(err,db){
            if(err) throw err;     

            db.collection(config.db.collections.users).updateOne({_id:userId}, {$pop: {"tasks": taskNumber}},function(err,result){
                if(err) throw err;

                console.log("was deleted task "+taskName+" user with id " +userId);
                db.close();
                if(callback)callback(err,result);
            })
        });
    }
}

module.exports = TaskDao;