var ReactDOM = require('react-dom');
var React = require('react');
var ReactRouterDOM = require('react-router-dom');
var Router = ReactRouterDOM.BrowserRouter;
var Route = ReactRouterDOM.Route;
var Switch = ReactRouterDOM.Switch;
var App = require("./routes/App.jsx");

ReactDOM.render(
    <Router>
        <App />
    </Router>, document.querySelector('#app'));