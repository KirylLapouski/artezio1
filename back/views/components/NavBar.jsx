var React = require("react");
var config = require('../../etc/config.json');
var UserInfo = require('./UserInfo');
class Navbar extends React.Component{
    constructor(props){
        super(props);

        this.state={
            active: 0
        }
    }
    render(){    
    if(this.props.menuItems){
        var menuItems = this.props.menuItems.slice();

        var component = this;
        var menuItemsRes = menuItems.map(function(item,index){
            var classValue = (component.state.active == index)? 'nav-link active':'nav-link';
            return <li className="nav-item">
                    <a className={classValue}  href="#">{item.name}</a>
                    </li>;
        });
    }
    return <nav className="navbar navbar-expand-lg navbar-dark bg-primary" style={{boxShadow:'0 0.25rem 0.75rem rgba(0, 0, 0, .05)'}}>
                <a className="navbar-brand" href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarColor02">
                    <ul className="navbar-nav mr-auto">
                        {menuItemsRes}
                    </ul>
                </div>
                <UserInfo userName={this.props.userName}/>
            </nav>;
    }
}
module.exports = Navbar;