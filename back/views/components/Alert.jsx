var React = require('react');
class Alert extends React.Component{

  render(){
    return <div className="alert alert-warning alert-dismissible fade show" role="alert">
            {this.props.description}
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
  }
}

module.exports = Alert;