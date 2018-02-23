var React = require("react");
class LoginIn extends React.Component{
    render(){
        return <form method="POST" action="/about" className="form-signin">
                <img className="mb-4" src="https://getbootstrap.com/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72"/>
                <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                <label htmlFor="inputEmail" className="sr-only">User name</label>
                <input type="text" name="userName" id="inputEmail" className="form-control" placeholder="User name" required autoFocus/>
                <label htmlFor="inputPassword" className="sr-only">Password</label>
                <input type="password" name="password" id="inputPassword" className="form-control" placeholder="Password" required/>
                <div className="checkbox mb-3">
                    <label>
                    <input type="checkbox" value="remember-me"/> Remember me
                    </label>
                </div>
                <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                <p className="mt-5 mb-3 text-muted">&copy; 2017-2018</p>
            </form>
    }
}

module.exports = LoginIn;