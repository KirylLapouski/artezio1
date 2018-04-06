var ReactDOM = require('react-dom');
var React = require('react');
var ReactRouterDOM = require('react-router-dom');
var Router = ReactRouterDOM.BrowserRouter;
var Route = ReactRouterDOM.Route;
var Switch = ReactRouterDOM.Switch;
var App = require("./routes/App.jsx");

//alert optional cofiguration
const options = {
    position: 'bottom center',
    timeout: 5000,
    offset: '30px',
    transition: 'scale'
}
ReactDOM.render(
    <Router>
        <App />
    </Router>, document.querySelector('#app'));