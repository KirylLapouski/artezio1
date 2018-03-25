var React = require("react");
var config = require('../../etc/config.json');
var UserInfo = require('./UserInfo.jsx');
class Navbar extends React.Component{
    constructor(props){
        super(props);

        this.state={
            active: 0
        }
    }
    render(){    
        var menuItems = this.props.menuItems?this.props.menuItems.slice():[{name:'Home'},{name:'Profile'}];
        var component = this;
        var menuItemsRes = menuItems.map(function(item,index){
        var classValue = (component.state.active == index)? 'nav-link active':'nav-link';
                return <li key={index} className="nav-item">
                <a className={classValue}  href="#">{item.name}</a>
                </li>;
    });
    
    return <nav className="navbar navbar-expand-lg navbar-dark primary-color position-absolute" style={{boxShadow:'0 0.25rem 0.75rem rgba(0, 0, 0, .05)',top:'0',left:'0',right:'0'}}>
                <a className="navbar-brand" href="#">Navbar</a>
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