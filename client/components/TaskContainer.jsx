var React = require("react");
var Task = require("./Task.jsx");
var config = require('../../config.json');
var Parser = require('html-react-parser');
var Paginator = require('./Paginator.jsx');
class TaskContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            paginatorCurrentNumber: 1,
            loaded: false
        }
        this.handlePaginatorClick = this.handlePaginatorClick.bind(this);
        this.handleLeftArrowClick = this.handleLeftArrowClick.bind(this);
        this.handleRightArrowClick = this.handleRightArrowClick.bind(this);
        this.getUsers = this.getUsers.bind(this);
    }

    getUsers() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', config.rootUrl + config.dbApi, true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.send();
        var self = this;
        xhr.onload = function () {
            self.userRep = JSON.parse(xhr.responseText);
            self.setState({
                loaded: true
            })
        }
    }

    handlePaginatorClick(e) {
        this.setState({ paginatorCurrentNumber: e.target.getAttribute("data-key") });
    }

    handleLeftArrowClick() {
        this.setState({
            paginatorCurrentNumber: this.state.paginatorCurrentNumber - 1
        })
    }

    handleRightArrowClick() {
        this.setState({
            paginatorCurrentNumber: this.state.paginatorCurrentNumber + 1
        })
    }

    componentWillMount() {
        this.getUsers();
    }

    render() {
        var users = this.state.loaded ? this.userRep : [];
        if (users instanceof Array == false)
            users = [users];

        this.length = users.length;
        var usersRes = users.map(function (user) {
            return <Task key={user._id} name={user._id} description={user} />
        });

        return (
        <div className="list-group" style={{ margin: "0 auto", marginTop: '12vh', boxShadow: '0 0.210rem 0.710rem rgba(0, 0, 0, .010)', width: "700px", }}>
            {usersRes.slice(this.state.paginatorCurrentNumber * 10 - 10, this.state.paginatorCurrentNumber * 10 < this.length ? this.state.paginatorCurrentNumber * 10 : this.length)}
            <Paginator length={this.length} paginatorCurrentNumber={this.state.paginatorCurrentNumber} onLeftArrowClick={this.handleLeftArrowClick} onRightArrowClick={this.handleRightArrowClick} onPaginatorNumberClick={this.handlePaginatorClick}/>
        </div>);
    }
}

module.exports = TaskContainer;
