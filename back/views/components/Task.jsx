var React = require('react');
var config = require('../../etc/config.json');
var Parser = require('html-react-parser');
class Task extends React.Component {

    constructor(props){
      super(props);

      this.state = {
        isOpened:false,
        isСhanging:false,
        email: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        city: "",
      }
      this.clickHandler = this.clickHandler.bind(this);
      this.editUser = this.editUser.bind(this);
      this.onChangeHandler = this.onChangeHandler.bind(this);
      this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }
    clickHandler(e){
      e.preventDefault();
      this.setState(prevState =>({
        isOpened: !prevState.isOpened
      }));
      return false;
    }
    onChangeHandler(e){
      var {name,value} = e.target;
      this.setState(prevState =>({
          [name]: value
        }));
  }
  onSubmitHandler(e){
    /*e.preventDefault();
    var xhr =  new XMLHttpRequest();
    xhr.open('POST', config.rootUrl + config.auth +'/local',false);
    xhr.setRequestHeader('Content-Type', 'application/json');
    
    xhr.send(JSON.stringify({mail:this.state.mail, password:this.state.password}));

    if(xhr.status == 200){
        localStorage.setItem("enteredUser",JSON.stringify(xhr.responseText));
        console.log('/user/'+xhr.responseText);
    }*/
  }
   /* deleteTask(e){
      e.preventDefault();
      e.stopPropagation();

      var xhr = new XMLHttpRequest();
      xhr.open('DELETE', config.rootUrl+config.dbApi+'/'+req.body.userName);

    }*/
    editUser(){
      this.setState(prevState =>({
        isСhanging: !prevState.isСhanging
      }));
      return false;
    }
    render(){
      var description  = <p>
                            {this.props.description.email?"Email: "+ this.props.description.email:""} {this.props.description.email?Parser("<br/>"):""}
                            {this.props.description.phoneNumber?"Phone number: "+ this.props.description.phoneNumber:""} {this.props.description.phoneNumber?Parser("<br/>"):""}
                            {this.props.description.city?"City: "+ this.props.description.city:""}{this.props.description.city?Parser("<br/>"):""}
                          </p> 
      
      description = this.state.isOpened?description:'';
      var changeForm = <div><b>Edit profile</b>
                        <form >
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label for="inputEmail4">First Name</label>
                                    <input onChange={this.onChangeHandler} name="firstName" type="text" className="form-control" id="inputEmail4" placeholder="Kirill"/>
                                </div>
                                <div className="form-group col-md-6">
                                    <label for="inputPassword4">Surname</label>
                                    <input onChange={this.onChangeHandler} name="lastName" type="text" className="form-control" id="inputPassword4" placeholder="Lapkovsky"/>
                                </div>
                            </div>
                                              
                            <div className="form-group">
                                <label for="inputEmail">Email</label>
                                <input onChange={this.onChangeHandler} type="email" name="mail" id="inputEmail" className="form-control" placeholder="lapkovskyk@mail.ru"/>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label for="inputCity">City</label>
                                    <input onChange={this.onChangeHandler} name="city" type="text" className="form-control" id="inputCity" placeholder="New York City"/>
                                </div>
                                <div className="form-group col-md-6">
                                    <label for="inputZip">Phone Number</label>
                                    <input onChange={this.onChangeHandler} name="phoneNumber" type="text" className="form-control" id="inputZip" placeholder="+ 375 25 545 55 09"/>
                                </div>
                            </div>
                            <button type="submit" onSubmit={this.onSubmitHandler} className="btn btn-primary btn-md">Change</button>
                        </form>
                        </div>

        return (<a onClick={this.clickHandler} href="#" className="list-group-item list-group-item-action flex-column align-items-start">
        <div className="d-flex w-100 justify-content-between">
          <h5 className="mb-1">{this.props.description.firstName?this.props.description.firstName:"User"} {this.props.description.lastName?this.props.description.lastName:" "}</h5>
          <small style={{marginRight:'50px', marginTop:'5px'}}>3 days ago</small>
        </div>
        <i onClick={this.editUser} className="fa fa-pencil" aria-hidden="true" style={{position: "absolute", top: "15px",right: "36px"}}></i>
        <button type="button" className="close" aria-label="Close" style={{position:'absolute',top:'13px',right:'15px'}} >
          <span aria-hidden="true">&times;</span>
        </button>
        <p className="mb-1" align="left">{this.state.isСhanging?changeForm:description}</p>
       
      </a>);
    }
}

module.exports = Task;