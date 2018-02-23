var ReactDOM = require('react-dom');
var React = require('react');
var TaskContainer = require('./components/TaskContainer.jsx');
var LoginIn = require('./components/LoginIn.jsx');
var ReactRouterDOM = require('react-router-dom');
var Router = ReactRouterDOM.BrowserRouter;
var Route = ReactRouterDOM.Route;
var Switch = ReactRouterDOM.Switch;
var props = window.PROPS;

ReactDOM.render(
    <Router>
    <Switch>
        <Route exact   path="/" component={LoginIn}/>
        <Route  path="/user" component={()=><TaskContainer tasks={props}/>} />
        <Route  path="/about" component={()=>{<h1>About</h1>}} />
        <Route component={()=>{<h2>Not Found</h2>}} />
    </Switch>
</Router>,document.querySelector('#app'));