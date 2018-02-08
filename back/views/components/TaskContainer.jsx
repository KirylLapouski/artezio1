var React = require("react");
var Task = require("./Task.jsx");
class TaskContainer extends React.Component{
    render(){
        var tasks;

        var xhr = new XMLHttpRequest();
        var cookies = document.cookie.split(';');
        var userId;
        console.log('123124241');
        for(var i=0;i< cookies.length;i++){
            if(cookies[i].includes('userId')){
                var userId =+ cookies[i].replace('userId=','');
            }
        }
        console.log(userId);
        xhr.open('GET', 'http://localhost:3000/db/users/'+userId,false);
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