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
        setTimeout(()=>{ this.setState( {
            userName:JSON.parse(localStorage.getItem("currentUser")).firstName?JSON.parse(localStorage.getItem("currentUser")).firstName:"User",
            userId:JSON.parse(localStorage.getItem('currentUser'))._id?JSON.parse(localStorage.getItem('currentUser'))._id:""})},0);      


    }

    onLogOut(e){
       /* var xhr = new XMLHttpRequest();

        xhr.open('GET','/auth/logout',true);
        xhr.send()

        xhr.onload = function(){
            localStorage.removeItem("currentUser");
            console.log(xhr.responseText);
        }*/
    }
    render(){
       
        return <div  className="navbar-brand" style={{position:'absolute', right:'70px',top:'10px'}}   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Hello, {this.state.userName}
                    <img src={config.rootUrl+"/images/user.png"} width="30" height="30" className="d-inline-block align-top rounded-circle" alt="" style={{marginLeft:'3px'}}></img>                    
                   <a href="/auth/logout" > <i  style={{cursor:"pointer"}} className="fa fa-sign-out" aria-hidden="true"></i></a>            
                </div>
    }
}
module.exports = UserInfo;