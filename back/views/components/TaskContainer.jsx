var React = require("react");
var Task = require("./Task.jsx");
var config = require('../../etc/config.json');
class TaskContainer extends React.Component{
    render(){
            var tasks = JSON.parse(this.props.tasks).slice();
            console.log('----')
            console.log(tasks);

            var tasksRes = tasks.map(function(task){
                return <Task name={task.name} description={task.description} />
            });
 
        return (<div className="list-group">
                    {tasksRes}
                </div>);      
    }
}

module.exports = TaskContainer;
