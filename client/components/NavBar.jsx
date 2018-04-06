
var React = require("react");
var config = require('../../config.json');
var UserInfo = require('./UserInfo.jsx');
var ReactRouterDom = require('react-router-dom')
var Link = ReactRouterDom.Link;
class Navbar extends React.Component{
    constructor(props){
        super(props);

        this.state={
            active: 0,
            userId: ''
        }
     
      
    }

    componentDidMount(){
        
        if(!localStorage.getItem('currentUser')){
            var xhr = new XMLHttpRequest();
            xhr.open('GET', config.rootUrl+config.dbApi+'/getEnteredUser', true);
            xhr.send();        
        
            xhr.onload = function(){
                if(this.status==200)
                    localStorage.setItem('currentUser',this.responseText);
                
            }
        }
    }

    render(){   

        var menuItems = this.props.menuItems?this.props.menuItems.slice():[{name:'Home',path:'/'},{name:'Profile',path:config.userProfile}];
        var component = this;
        var menuItemsRes = menuItems.map(function(item,index){
        var classValue = (component.state.active == index)? 'nav-link active':'nav-link';
                return <li key={index} className="nav-item">
                <Link className={classValue}  to={item.path}>{item.name}
                </Link>
                </li>;
    });
    
    return <nav className="navbar navbar-expand-lg navbar-dark primary-color position-absolute" style={{boxShadow:'0 0.25rem 0.75rem rgba(0, 0, 0, .05)',top:'0',left:'0',right:'0',zIndex:'1'}}>
                <a className="navbar-brand" href="#">Logo</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#basicExampleNav" aria-controls="basicExampleNav"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                 <div className="collapse navbar-collapse" id="basicExampleNav">
                    <ul className="navbar-nav mr-auto">
                        {menuItemsRes}
                    </ul>
                </div>
                <UserInfo />
            </nav>;
    }
}
module.exports = Navbar;