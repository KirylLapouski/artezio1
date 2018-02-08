var React = require('react');
class Task extends React.Component {

    render(){
        return <a href="#" className="list-group-item list-group-item-action flex-column align-items-start">
        <div className="d-flex w-100 justify-content-between">
          <h5 className="mb-1">{this.props.name}</h5>
          <small>3 days ago</small>
        </div>
        <p className="mb-1">{this.props.description}</p>
      </a>
    }
}

module.exports = Task;