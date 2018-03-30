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
    render(){
        //<div class="btn-group">
    //<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Basic dropdown</button>

   // <div class="dropdown-menu">
    //    <a class="dropdown-item" href="#">Action</a>
    //    <a class="dropdown-item" href="#">Another action</a>
    //    <a class="dropdown-item" href="#">Something else here</a>
    //    <div class="dropdown-divider"></div>
    //    <a class="dropdown-item" href="#">Separated link</a>
    //</div>
    //</div>
        return <div className="navbar-brand dropdown-toggle" style={{position:'absolute', right:'70px',top:'10px',cursor: "pointer"}}   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                     <div className="dropdown-menu">
                        <a href={config.userProfile} className="dropdown-item">Profile</a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href={config.logOut}>Log out</a>
                    </div>
                    Hello, {this.state.userName}
                    <img src={config.rootUrl+"/images/user.png"} width="30" height="30" className="d-inline-block align-top rounded-circle" alt="" style={{marginLeft:'3px'}}></img>                    
                     </div>
    }
}
module.exports = UserInfo;