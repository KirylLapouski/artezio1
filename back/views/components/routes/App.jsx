var React = require("react");
var Header = require("./Header.jsx");
var Main = require("./Main.jsx");
class App extends React.Component{
    render(){
       return <div className="w-100 h-100" style={{display:"flex",justifyContent:"center"}}>
                <Header />
                <Main /> 
            </div>;
    }
}
module.exports = App;