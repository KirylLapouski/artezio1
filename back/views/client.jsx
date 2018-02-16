var ReactDOM = require('react-dom');
var React = require('react');
var TaskContainer = require('./components/TaskContainer.jsx');
var Alert = require('./components/Alert.jsx');
var props = window.PROPS;
ReactDOM.render(React.createElement(TaskContainer,props),document.getElementById('tasks'));