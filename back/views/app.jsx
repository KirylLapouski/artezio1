var ReactDOM = require('react-dom');
var React = require('react');
var TaskContainer = require('./components/TaskContainer.jsx');
var Alert = require('./components/Alert.jsx');

ReactDOM.render(<TaskContainer userId = {document.cookie.userId}/>,document.getElementById('task'));