var React = require('react');
var ReactRouterDom = require('react-router-dom');
var Link = ReactRouterDom.Link;
var config = require('../../etc/config.json');
class SignUp extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            userName: '',
            password:''
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
        /*e.preventDefault();
        
        var body = {
                    'userName': this.state.userName ,
                    'password':  this.state.password
            };
        var xhr =  new XMLHttpRequest();
        xhr.open('POST', config.rootUrl + config.userCabinet +'/'+ this.state.userName,false);
        xhr.setRequestHeader('Content-Type', 'application/json');
        
        xhr.send(JSON.stringify(body));
        var user = this.state.userName;

        
        
           // window.localStorage.setItem('enteredUser',user);
            if(xhr.status==200){
              

                    //window.PROPS = this.responseText;
                //console.log( window.PROPS);
               // history.pushState(null, '', '/user/'+user);

            }else{
                
                //НЕПРАВИЛЬНЫЙ ЛОГИН ИЛИ ПАРОЛЬ
            }      */      
    }
    render(){
        return (    
        <form style={{width: "330px"}}>
            <p className="h4 text-center mb-4">Sign up</p>
        
            <label htmlFor="defaultFormRegisterNameEx" className="grey-text">Your name</label>
            <input type="text" id="defaultFormRegisterNameEx" className="form-control"/>
            
            <br/>
        
            <label htmlFor="defaultFormRegisterEmailEx" className="grey-text">Your email</label>
            <input type="email" id="defaultFormRegisterEmailEx" className="form-control"/>
            
            <br/>
        
            <label htmlFor="defaultFormRegisterConfirmEx" className="grey-text">Confirm your email</label>
            <input type="email" id="defaultFormRegisterConfirmEx" className="form-control"/>
        
            <br/>
        
            <label htmlFor="defaultFormRegisterPasswordEx" className="grey-text">Your password</label>
            <input type="password" id="defaultFormRegisterPasswordEx" className="form-control"/>
        
            <div className="text-center mt-4">
                <button className="btn-primary btn" type="submit">Register</button>
            </div>

        </form>);
    }
}

module.exports = SignUp;   