var React = require('react');
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
        xhr.open('POST', config.rootUrl + config.userCabinet,true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(body));

        xhr.onload = function(){
            if(this.status==200){
                alert(this.responseText);
            }else{
                //НЕПРАВИЛЬНЫЙ ЛОГИН ИЛИ ПАРОЛЬ
            }

        }
    }
    render(){
        return (<form method="POST" action="/user" className="form-signin">
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
                <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={this.onSubmitHandler}>Sign in</button>
                <p className="mt-5 mb-3 text-muted">&copy; 2017-2018</p>
            </form>);
    }
}

module.exports = LoginIn;