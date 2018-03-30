var React = require("react");
var ReactRouterDom = require("react-router-dom");
var Link = ReactRouterDom.Link;
var config = require('../../etc/config.json');
class UserInfo extends React.Component{
    constructor(props){
        super(props);

        this.state={
            userName: "User",
        }
    }
    componentDidMount(){
        //load image there
        this.setState( {userId:JSON.parse(localStorage.getItem('currentUser'))._id});       

       setTimeout(function(){this.setState({
            userName:   localStorage.getItem("currentUser")?JSON.parse(localStorage.getItem("currentUser")).firstName:"User",
        })}.bind(this),300);

    }

    onLogOut(e){
        e.preventDefault();
        console.log(111);
        var xhr = new XMLHttpRequest();

        xhr.open('GET','/auth/logout',true);
        xhr.send()

        xhr.onload = function(){
            localStorage.removeItem("currentUser");
        }
    }
    render(){
       
        return <div  className="navbar-brand dropdown-toggle" style={{position:'absolute', right:'70px',top:'10px',cursor: "pointer"}}   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                     <div className="dropdown-menu">
                        <a href={config.userProfile} className="dropdown-item">Profile</a>
                        <div className="dropdown-divider"></div>
                        <a onClick={this.onLogOut} className="dropdown-item">Log out</a>
                    </div>
                    Hello, {this.state.userName}
                    <img src={config.rootUrl+"/images/user.png"} width="30" height="30" className="d-inline-block align-top rounded-circle" alt="" style={{marginLeft:'3px'}}></img>                    
                     </div>
    }
}
module.exports = UserInfo;