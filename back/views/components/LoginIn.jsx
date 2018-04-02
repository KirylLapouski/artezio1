var React = require('react');
var ReactRouterDom = require('react-router-dom');
var Link = ReactRouterDom.Link;
var config = require('../../etc/config.json');
var toastr = require('toastr');
class LoginIn extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            mail: '',
            password:''
          };
        
          this.onChangeHandler = this.onChangeHandler.bind(this);
          this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }
   
    onChangeHandler(e){
        var {name,value} = e.target;
        this.setState({
            [name]: value
          });
    }
    validate(){

        //email validation
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        var address = document.forms.loginIn.elements.mail.value;
        if(reg.test(address) == false) {
            toastr.error("Wrong email format");
            return false;
        }
        if(!document.forms.loginIn.elements.mail.value || !document.forms.loginIn.elements.password.value){
            toastr.error("All fields should be filled");
            return false;
        }
        return true;
    }
    onSubmitHandler(e){  
        e.preventDefault(); 

        if(!this.validate())
            return;

        var xhr =  new XMLHttpRequest();
        xhr.open('POST', config.rootUrl + config.auth +'/local',true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        
        xhr.onload = ()=>{

            if(xhr.status != 404){
                xhr.open('GET',config.rootUrl+config.dbApi+"/getEnteredUser",true);
                xhr.send();
        
                xhr.onload = ()=>{  
                        if(xhr.status == 500){

                        }else{  
                            var currentUser = JSON.parse(xhr.responseText);
                            localStorage.setItem("currentUser",JSON.stringify(currentUser));
                            document.location.href = config.rootUrl + config.userCabinet +"/" + currentUser._id;
                        }
                }
            }
        }

        xhr.send(JSON.stringify({mail:this.state.mail, password:this.state.password}));
    }
    render(){
            return(<div className="w-100 h-100" style={{backgroundImage: "url('https://mdbootstrap.com/img/Photos/Others/images/78.jpg')", backgroundRepeat:"no-repeat", backgroundSize: "cover"}}>

                    <div className="w-100 h-100 mask rgba-black-light d-flex justify-content-center align-items-center">
                
                    <div className="container">
                
                        <div className="row wow fadeIn" style={{visibility: "visible", animationName: "fadeIn"}}>
                
                            <div className="col-md-6 mb-4 white-text text-center text-md-left">
                    
                                <h1 className="display-4 font-weight-bold">Learn Bootstrap 4 with MDB</h1>
                    
                                <hr className="hr-light"/>
                    
                                <p>
                                <strong>Best &amp; free guide of responsive web design</strong>
                                </p>
                    
                                <p className="mb-4 d-none d-md-block">
                                <strong>The most comprehensive tutorial for the Bootstrap 4. Loved by over 500 000 users. Video and written versions
                                    available. Create your own, stunning website.</strong>
                                </p>
                    
                                <a target="_blank" href="https://mdbootstrap.com/bootstrap-tutorial/" className="btn btn-indigo btn-lg waves-effect waves-light">Start free tutorial
                                <i className="fa fa-graduation-cap ml-2"></i>
                                </a>
                    
                            </div>
                            <form method="POST" name="loginIn"  className="form-signin" style={{borderRadius: "5px",backgroundColor:"#fff",color:"#4f4f4f"}}>
                                <img className="mb-4" src="https://getbootstrap.com/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72"/>
                                <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                                <label htmlFor="inputEmail" className="sr-only">User name</label>
                                <input onChange={this.onChangeHandler} type="text" name="mail" id="inputEmail" className="form-control" placeholder="User name" required autoFocus/>
                                <label htmlFor="inputPassword" className="sr-only">Password</label>
                                <input onChange={this.onChangeHandler} type="password" name="password" id="inputPassword" className="form-control" placeholder="Password" required/>
                                <br/>
                            
                                <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={this.onSubmitHandler}>Sign in</button><br/>
                                <a role="button"    href="auth/linkedin"  className="btn btn-light-blue btn-block btn-li waves-effect waves-light"><i className="fa fa-linkedin pr-1"></i> Linkedin</a>            
                                <div className="modal-footer pr-0">
                                        <div className="options font-weight-light">
                                            <p>Not a member?  <Link to="/signUp">Sign Up</Link></p>
                                        </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                </div>);
    }
}

module.exports = LoginIn;