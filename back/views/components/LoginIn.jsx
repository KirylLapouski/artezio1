var React = require('react');
var ReactRouterDom = require('react-router-dom');
var Link = ReactRouterDom.Link;
var config = require('../../etc/config.json');
class LoginIn extends React.Component{

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
        e.preventDefault();
        
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
            }            
    }
    render(){
        return (<form method="POST" action="/" className="form-signin">
                <img className="mb-4" src="https://getbootstrap.com/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72"/>
                <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                <label htmlFor="inputEmail" className="sr-only">User name</label>
                <input onChange={this.onChangeHandler} type="text" name="userName" id="inputEmail" className="form-control" placeholder="User name" required autoFocus/>
                <label htmlFor="inputPassword" className="sr-only">Password</label>
                <input onChange={this.onChangeHandler} type="password" name="password" id="inputPassword" className="form-control" placeholder="Password" required/>
                <div className="checkbox mb-3">
                    <label>
                    <input type="checkbox" value="remember-me"/> Remember me
                    </label>
                </div>
               
                <Link to="user/User2"><button className="btn btn-lg btn-primary btn-block" type="submit" onClick={this.onSubmitHandler}>Sign in</button></Link><br/>
                <a role="button" href="auth/linkedin" className="btn btn-light-blue btn-block btn-li waves-effect waves-light"><i className="fa fa-linkedin pr-1"></i> Linkedin</a>            
                <a role="button" href="auth/facebook" className="btn btn-indigo btn-block btn-fb waves-effect waves-light"><i className="fa fa-facebook pr-1"></i> Facebook</a>
                <p className="mt-5 mb-3 text-muted">&copy; 2017-2018</p>
            </form>);
    }
}

module.exports = LoginIn;