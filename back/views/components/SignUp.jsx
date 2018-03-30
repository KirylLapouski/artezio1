var React = require('react');
var ReactRouterDom = require('react-router-dom');
var Link = ReactRouterDom.Link;
var config = require('../../etc/config.json');
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

        var formData = new FormData(document.forms.signUp);
        var xhr = new XMLHttpRequest();
        xhr.open('POST','/signUp/local',true);

        xhr.send(formData);

      
        if(this.state.password!== this.state.passwordConfirm)
        {
            //WRONG PASSWORD
            e.preventDefault();
        }

    }
    render(){
        return (    
        <form name="signUp" method="POST" action="/signUp/local" style={{width: "330px"}}>
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
                <button className="btn-primary btn" onClick={this.onSubmitHandler} type="submit">Register</button>
            </div>

        </form>);
    }
}

module.exports = SignUp;   