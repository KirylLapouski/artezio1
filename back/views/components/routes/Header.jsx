var React = require("react");
var NavBar  = require("../NavBar.jsx");
var ReactRouterDOM = require("react-router-dom");
var Switch = ReactRouterDOM.Switch;
var Route = ReactRouterDOM.Route;
class Header extends React.Component{
    render(){
      return  <header>
                <Switch>
                    <Route path='/user/:userName' component={NavBar}/>
                    <Route path="/signUp" component={NavBar}/>
                </Switch>
            </header>;
    }
}

module.exports = Header;