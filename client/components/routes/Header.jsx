var React = require("react");
var NavBar  = require("../NavBar.jsx");
var ReactRouterDOM = require("react-router-dom");
var Switch = ReactRouterDOM.Switch;
var Route = ReactRouterDOM.Route;
class Header extends React.Component{
    render(){
      return  <header>
                <Switch>
                    <Route path='/user/:id' component={NavBar}/>
                </Switch>
            </header>;
    }
}

module.exports = Header;