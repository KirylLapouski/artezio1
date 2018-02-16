var React = require('react');
var  XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
var config = require('../../etc/config.json');
class Task extends React.Component {

    constructor(props){
      super(props);

      this.state = {
        isOpened:false
      }
      this.clickHandler = this.clickHandler.bind(this);
    }
    clickHandler(e){
      e.preventDefault();
      this.setState(prevState =>({
        isOpened: !prevState.isOpened
      }));
      return false;
    }

   /* deleteTask(e){
      e.preventDefault();
      e.stopPropagation();

      var xhr = new XMLHttpRequest();
      xhr.open('DELETE', config.rootUrl+config.dbApi+'/'+req.body.userName);

    }*/
    render(){
      var description = this.state.isOpened?this.props.description:'';
        return <a onClick={this.clickHandler} href="#" className="list-group-item list-group-item-action flex-column align-items-start">
        <div className="d-flex w-100 justify-content-between">
          <h5 className="mb-1">{this.props.name}</h5>
          <small style={{marginRight:'50px', marginTop:'5px'}}>3 days ago</small>
        </div>
        <button type="button" className="close" aria-label="Close" style={{position:'absolute',top:'13px',right:'15px'}} >
          <span aria-hidden="true">&times;</span>
        </button>
        <p className="mb-1">{description}</p>
       
      </a>
    }
}

module.exports = Task;