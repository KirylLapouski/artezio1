var React = require("react");
class UserInfo extends React.Component{
    render(){
        return (<a className="navbar-brand" href="#" style={{position:'absolute', right:'70px'}}>
                    {this.props.userName?this.props.userName:"User"}
                    <img src="./images/user.png" width="30" height="30" className="d-inline-block align-top rounded-circle" alt="" style={{marginLeft:'3px'}}></img>                    
                </a>);
    }
}
module.exports = UserInfo;