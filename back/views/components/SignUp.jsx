var React = require('react');
var ReactRouterDom = require('react-router-dom');
var Link = ReactRouterDom.Link;
var config = require('../../etc/config.json');
var toastr = require('toastr');

class SignUp extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            email: '',
            password:'',
            passwordConfirm:''
          };
        
          this.onChangeHandler = this.onChangeHandler.bind(this);
          this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler(e){
        var {name,value} = e.target;
        this.setState(prevState =>({
            [name]: value
          }));
    }
    onSubmitHandler(e){
        if(!this.state.email || !this.state.password || !this.state.passwordConfirm){
            toastr.error('All fields should be filled');
        }else if(this.state.password!== this.state.passwordConfirm)
        {
            toastr.error('Passwords are not equal');
            //WRONG PASSWORD
        }else{
            e.preventDefault();
            
            var xhr = new XMLHttpRequest();
            xhr.open('POST','/signUp/local',true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify({email:this.state.email,password:this.state.password}));

            xhr.onload = ()=>{
                if(xhr.status==200){
                    xhr.open('GET',config.rootUrl+config.dbApi+"/getEnteredUser",true);
                    xhr.send();

                    xhr.onload = ()=>{
                        if(xhr.status==200)
                        {
                            localStorage.setItem("currentUser",xhr.responseText);
                            document.location.href = "/user/" + JSON.parse(xhr.responseText)._id;
                        }
                    }
                }else {
                    toastr.error(xhr.responseText);
                }
            }
        }
      


    }
    render(){
        return (    
            <div className="w-100 h-100" style={{backgroundImage: "url('https://mdbootstrap.com/img/Photos/Others/images/78.jpg')", backgroundRepeat:"no-repeat", backgroundSize: "cover"}}>

                <div className="w-100 h-100 mask rgba-black-light d-flex justify-content-center align-items-center">
                
                    <div className="container" style={{display:"flex",justifyContent:"center"}}>
                
                        <div className="row wow fadeIn" style={{visibility: "visible", animationName: "fadeIn"}}>
                            <form name="signUp" method="POST" action="" style={{width: "370px",padding:"30px 30px", borderRadius: "5px",backgroundColor:"#fff",color:"#4f4f4f"}}>
                                <p className="h4 text-center mb-4">Sign up</p>
                            
                            
                                <label htmlFor="defaultFormRegisterEmailEx" className="grey-text">Your email</label>
                                <input onChange={this.onChangeHandler} type="email" id="defaultFormRegisterEmailEx" name="email" className="form-control"/>
                                
                                <br/>
                            
                                <label htmlFor="defaultFormRegisterPasswordEx" className="grey-text">Your password</label>
                                <input onChange={this.onChangeHandler} type="password" id="defaultFormRegisterPasswordEx" name="password" className="form-control"/>
                            
                                <br/>

                                <label htmlFor="defaultFormRegisterCheckPassword" className="grey-text">COnfirm your password</label>
                                <input onChange={this.onChangeHandler} type="password" id="defaultFormRegisterCheckPassword" name="passwordConfirm" className="form-control"/>
                                
                                <div className="text-center mt-4">
                                    <button className="btn-primary btn"   onClick={this.onSubmitHandler} type="submit">Register</button>
                                </div>
                                
                            </form>
                        </div>
                    </div>
                </div>
            </div>);
    }
}

module.exports = SignUp;   