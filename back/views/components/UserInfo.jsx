var React = require("react");
var config = require('../../etc/config.json');
class UserInfo extends React.Component{
    constructor(props){
        super(props);

        this.state={
            userName: "User"
        }
    }
    componentDidMount(){
        //load image there

       setTimeout(function(){this.setState({
            userName:   localStorage.getItem("currentUser")?JSON.parse(localStorage.getItem("currentUser")).firstName:"User"
        })}.bind(this),200);

    }
    render(){
        return (<a className="navbar-brand" href="#" style={{position:'absolute', right:'70px',top:'10px'}}>
                    Hello, {this.state.userName}
                    <img src={config.rootUrl+"/images/user.png"} width="30" height="30" className="d-inline-block align-top rounded-circle" alt="" style={{marginLeft:'3px'}}></img>                    
                </a>);
    }
}
module.exports = UserInfo;