var React = require("react");
var Task = require("./Task.jsx");
var config = require('../../etc/config.json');
class TaskContainer extends React.Component{
    render(){
            if(this.props.tasks){
                var tasks = JSON.parse(this.props.tasks).slice();

                var tasksRes = tasks.map(function(task){
                    return <Task name={task.name} description={task.description} />
                });
            }
        return (<div className="list-group">
                    {tasksRes}
                </div>);      
    }
}

module.exports = TaskContainer;
