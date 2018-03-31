var React = require('react');
var config = require('../../etc/config.json');
var Parser = require('html-react-parser');
var toastr = require('toastr');

class Task extends React.Component {

    constructor(props){
      super(props);

      this.state = {
        isOpened:false,
        isСhanging:false,
        isDeleted:false,
        _id: this.props.description._id,
        email: this.props.description.email,
        firstName: this.props.description.firstName,
        lastName: this.props.description.lastName,
        phoneNumber: this.props.description.phoneNumber,
        city: this.props.description.city,
      }

      this.clickHandler = this.clickHandler.bind(this);
      this.editUser = this.editUser.bind(this);
      this.onChangeHandler = this.onChangeHandler.bind(this);
      this.onSubmitHandler = this.onSubmitHandler.bind(this);
      this.deleteTask = this.deleteTask.bind(this);
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
    var xhr =  new XMLHttpRequest();
    xhr.open('PUT', config.rootUrl + config.dbApi,true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    //create request body (user changes)
    //NEED TO CHANGE
    var user={_id: this.props.description._id};
    if(this.state.email)
      user.email = this.state.email;
    if(this.state.firstName)
      user.firstName = this.state.firstName;
    if(this.state.lastName)
      user.lastName = this.state.lastName;
    if(this.state.phoneNumber)
      user.phoneNumber = this.state.phoneNumber;
    if(this.state.city)
      user.city = this.state.city;

    var self = this;
    xhr.send(JSON.stringify(user));

  
    xhr.onload = ()=>{ 
      if(xhr.status == 200){
          self.setState({
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            city: user.city,
          });
          this.props.description.firstName = user.firstName;
          this.props.description.lastName = user.lastName;

          toastr.success('User was edited successful');
      }else{
        toastr.error('Something goes wrong','User was not edited');
      }
    }
    
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
    deleteTask(e){
        e.preventDefault();
        e.stopPropagation();

        var xhr = new XMLHttpRequest();
        xhr.open('DELETE', config.rootUrl+config.dbApi+'/'+this.props.description._id,true);

        xhr.send()

        
        var self = this;
        xhr.onload = function(){
          if(this.status == 200){
            
            toastr.success('User was deleted successful');
            self.setState({
              isDeleted: true
            })
          }else{
            toastr.error('Something goes wrong','User was not deleted');
          }
        }


    }
    editUser(){
      this.setState(prevState =>({
        isСhanging: !prevState.isСhanging
      }));
      return false;
    }
    render(){
      var description  = <p>
                            {this.state.email?"Email: "+ this.state.email:""} {this.state.email?Parser("<br/>"):""}
                            {this.state.phoneNumber?"Phone number: "+ this.state.phoneNumber:""} {this.state.phoneNumber?Parser("<br/>"):""}
                            {this.state.city?"City: "+ this.state.city:""}{this.state.city?Parser("<br/>"):""}
                          </p> 
      
      description = this.state.isOpened?description:'';
      var changeForm = <div><b>Edit profile</b>
                        <form >
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputEmail4">First Name</label>
                                    <input onChange={this.onChangeHandler} name="firstName" type="text" className="form-control" id="inputEmail4" placeholder="Kirill"/>
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputPassword4">Surname</label>
                                    <input onChange={this.onChangeHandler} name="lastName" type="text" className="form-control" id="inputPassword4" placeholder="Lapkovsky"/>
                                </div>
                            </div>
                                              
                            <div className="form-group">
                                <label htmlFor="inputEmail">Email</label>
                                <input onChange={this.onChangeHandler} type="email" name="email" id="inputEmail" className="form-control" placeholder="lapkovskyk@mail.ru"/>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputCity">City</label>
                                    <input onChange={this.onChangeHandler} name="city" type="text" className="form-control" id="inputCity" placeholder="New York City"/>
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputZip">Phone Number</label>
                                    <input onChange={this.onChangeHandler} name="phoneNumber" type="text" className="form-control" id="inputZip" placeholder="+ 375 25 545 55 09"/>
                                </div>
                            </div>
                            <button type="submit" onClick={this.onSubmitHandler} className="btn btn-primary btn-md">Change</button>
                        </form>
                        </div>

        return (<a style={ {display:this.state.isDeleted?"none":"block"}}onClick={this.clickHandler} href="#" className="list-group-item list-group-item-action flex-column align-items-start">
        <div className="d-flex w-100 justify-content-between">
          <h5 className="mb-1">{this.props.description.firstName?this.props.description.firstName:"User"} {this.props.description.lastName?this.props.description.lastName:" "}</h5>
          <small style={{marginRight:'50px', marginTop:'5px'}}>3 days ago</small>
        </div>
        <i onClick={this.editUser} className="fa fa-pencil" aria-hidden="true" style={{position: "absolute", top: "15px",right: "36px"}}></i>
        <button onClick={this.deleteTask} type="button" className="close" aria-label="Close" style={{position:'absolute',top:'13px',right:'15px'}} >
          <span aria-hidden="true">&times;</span>
        </button>
        <p className="mb-1" align="left">{this.state.isСhanging?changeForm:description}</p>
      </a>);
    }
}

module.exports = Task;