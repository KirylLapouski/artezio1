var React = require("react");
var Task = require("./Task.jsx");
var config = require('../etc/config.json');
class TaskContainer extends React.Component{
    render(){
        var tasks;

        var xhr = new XMLHttpRequest();
        var cookies = document.cookie.split(';');
        var userName;
       
        for(var i=0;i< cookies.length;i++){
            if(cookies[i].includes('userName')){
                userName =+ cookies[i].replace('userName=','');
            }
        }
        console.log(userName);
        xhr.open('GET', config.rootUrl+config.dbApi +'/'+userName,false);
        xhr.send();

        if(xhr.status==200)
        {
               
            let tasksTmp = JSON.parse(xhr.responseText).tasks;
               
            console.log(tasks);
            tasks = tasksTmp.map(function(task){
                return <Task name={task.name} description={task.description} />
            });
              
        }           
        
       
        return (<div className="list-group">
                    {tasks}
                </div>);
        
    }
}

module.exports = TaskContainer;
