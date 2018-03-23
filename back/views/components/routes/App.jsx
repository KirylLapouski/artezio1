var React = require("react");
var Header = require("./Header.jsx");
var Main = require("./Main.jsx");
class App extends React.Component{
    render(){
       return <div>
                <Header />
                <Main /> 
            </div>;
    }
}
module.exports = App;