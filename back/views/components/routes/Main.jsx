var React = require("react");
var ReactRouterDOM = require("react-router-dom");
var Switch = ReactRouterDOM.Switch;
var Route = ReactRouterDOM.Route;
var LoginIn = require("../LoginIn.jsx");
var TaskContainer = require("../TaskContainer.jsx");
var SignUp = require("../SignUp.jsx");
class Main extends React.Component{
    render(){
        return <Switch>
                    <Route exact   path="/" component={LoginIn}/>
                    <Route exact path="/user/:userName" component={TaskContainer} />
                    <Route exact path="/signUp" component={SignUp} />
                </Switch>
    }
}
module.exports = Main;