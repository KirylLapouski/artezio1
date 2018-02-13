var React = require("react");
var Task = require("./Task.jsx");
var config = require('../../etc/config.json');
class TaskContainer extends React.Component{
    render(){
            if(this.props.tasks){
                var tasks = JSON.parse(this.props.tasks).slice();

                var tasksRes = tasks.map(function(task){
                    return <Task key={task.name} name={task.name} description={task.description} />
                });

            }
        return (<div className="list-group" style={{marginTop:'10px', boxShadow:'0 0.25rem 0.75rem rgba(0, 0, 0, .05)'}}>
                    {tasksRes}
                    <button type="button" className="btn btn-outline-primary" style={{marginTop:'3px'}}>Add</button>
                </div>);      
    }
}

module.exports = TaskContainer;
