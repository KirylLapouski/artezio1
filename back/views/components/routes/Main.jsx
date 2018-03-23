var React = require("react");
var ReactRouterDOM = require("react-router-dom");
var Switch = ReactRouterDOM.Switch;
var Route = ReactRouterDOM.Route;
var LoginIn = require("../LoginIn.jsx");
var TaskContainer = require("../TaskContainer.jsx");
class Main extends React.Component{
    render(){
        return <Switch>
                    <Route exact   path="/" component={LoginIn}/>
                    <Route exact path="/user/:userName" component={TaskContainer} />
                </Switch>
    }
}
module.exports = Main;