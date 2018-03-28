var React = require("react");
var config = require('../../etc/config.json');
class UserInfo extends React.Component{
    componentDidMount(){
        //load image there
    }
    render(){
        return (<a className="navbar-brand" href="#" style={{position:'absolute', right:'70px',top:'10px'}}>
                    {localStorage.getItem("enteredUser")?localStorage.getItem("enteredUser").email:"User"}
<<<<<<< HEAD
                    <img src={ config.rootUrl+"/images/user.png"} width="30" height="30" className="d-inline-block align-top rounded-circle" alt="" style={{marginLeft:'3px'}}></img>                    
=======
                    <img src={config.rootUrl+"/images/user.png"} width="30" height="30" className="d-inline-block align-top rounded-circle" alt="" style={{marginLeft:'3px'}}></img>                    
>>>>>>> aa943302f3b582a68c81530a75162ddc2ad20e38
                </a>);
    }
}
module.exports = UserInfo;