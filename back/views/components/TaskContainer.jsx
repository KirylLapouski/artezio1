var React = require("react");
var Task = require("./Task.jsx");
var config = require('../../etc/config.json');
class TaskContainer extends React.Component{
   /* addTask(){
          
        var xhr = new XMLHttpRequest();
        xhr.open('POST', config.rootUrl+config.dbApi+'/'+req.body.userName+'/');
    }*/
    getUsers(){
        var xhr =  new XMLHttpRequest();
        xhr.open('GET',  config.rootUrl+config.dbApi,false);
        xhr.setRequestHeader('Content-Type', 'application/json');
        
        xhr.send();
        
        if(xhr.status == 200){
            return xhr.responseText;
        }
    }
    render(){
                
                var users = JSON.parse(this.getUsers()).slice();
                var usersRes = users.map(function(user){
                    return <Task key={user._id} name={user._id} description="description" />
                });

            
        return (<div className="list-group" style={{marginTop:'10px', boxShadow:'0 0.25rem 0.75rem rgba(0, 0, 0, .05)'}}> 
                    {usersRes}
                    <button type="button" className="btn btn-outline-primary" style={{marginTop:'3px'}}>Add</button>
                </div>);      
    }
}

module.exports = TaskContainer;
