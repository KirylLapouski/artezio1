var React = require('react');
var config = require('../../etc/config.json');
class Profile extends React.Component{

    constructor(props){
        super(props);

        this.state={
            userName: "User"
        }
    }

    componentDidMount(){
        //load image there


       setTimeout(function(){
           this.setState({
            userName:   localStorage.getItem("currentUser")?JSON.parse(localStorage.getItem("currentUser")).firstName:"User"
        })}.bind(this),300);

        setTimeout(function(){
            var xhr =  new XMLHttpRequest();
            xhr.open('GET', config.rootUrl + config.dbApi +'/'+ JSON.parse(localStorage.getItem("currentUser"))._id + '/image',false);
            
            xhr.send();

            if(xhr.status == 200){
                console.log(xhr.responseText);
        }},300);

    }
    render(){

    return <div className="card card-cascade wider">
                <div className="view overlay">
                    <img src="https://mdbootstrap.com/img/Photos/Horizontal/People/6-col/img%20%283%29.jpg" class="img-fluid"/>
                    <a href="#!">
                        <div class="mask rgba-white-slight"></div>
                    </a>
                </div>
                <div className="card-body text-center">
                    <h4 className="card-title"><strong>{this.state.userName}</strong></h4>
                    <h5 className="indigo-text"><strong>Photographer</strong></h5>

                    <p className="card-text">Sed ut perspiciatis unde omnis iste natus sit voluptatem accusantium doloremque laudantium, totam rem aperiam. </p>

                    
                    <a className="icons-sm li-ic"><i className="fa fa-linkedin"> </i></a>
                    <a className="icons-sm tw-ic"><i className="fa fa-twitter"> </i></a>
                    <a className="icons-sm fb-ic"><i className="fa fa-facebook"> </i></a>
                
                </div>
                    //CHECK REQ
                    <form>
                        <div className="md-form">
                            <div className="file-field">
                                <div className="btn btn-primary btn-sm float-left">
                                    <span>Choose file</span>
                                    <input type="file"/>
                                </div>
                                <div className="file-path-wrapper">
                                    <input className="file-path validate" type="text" placeholder="Upload your file"/>
                                </div>
                            </div>
                        </div>
                    </form>
    </div>
    }
}

module.exports = Profile;