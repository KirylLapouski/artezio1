var React = require('react');

class Profile extends React.Component{

    constructor(props){
        super(props);

        this.state={
            userName: "User"
        }
    }

    componentDidMount(){
        //load image there


       setTimeout(function(){this.setState({
            userName:   localStorage.getItem("currentUser")?JSON.parse(localStorage.getItem("currentUser")).firstName:"User"
        })}.bind(this),0);

    }
    render(){

    return <div class="card card-cascade wider">
                <div class="view overlay">
                    <img src="https://mdbootstrap.com/img/Photos/Horizontal/People/6-col/img%20%283%29.jpg" class="img-fluid"/>
                    <a href="#!">
                        <div class="mask rgba-white-slight"></div>
                    </a>
                </div>
                <div class="card-body text-center">
                    <h4 class="card-title"><strong>{this.state.userName}</strong></h4>
                    <h5 class="indigo-text"><strong>Photographer</strong></h5>

                    <p class="card-text">Sed ut perspiciatis unde omnis iste natus sit voluptatem accusantium doloremque laudantium, totam rem aperiam. </p>

                    
                    <a class="icons-sm li-ic"><i class="fa fa-linkedin"> </i></a>
                    <a class="icons-sm tw-ic"><i class="fa fa-twitter"> </i></a>
                    <a class="icons-sm fb-ic"><i class="fa fa-facebook"> </i></a>
                
                </div>
                    //CHECK REQ
                    <form>
                        <div class="md-form">
                            <div class="file-field">
                                <div class="btn btn-primary btn-sm float-left">
                                    <span>Choose file</span>
                                    <input type="file"/>
                                </div>
                                <div class="file-path-wrapper">
                                    <input class="file-path validate" type="text" placeholder="Upload your file"/>
                                </div>
                            </div>
                        </div>
                    </form>
    </div>
    }
}

module.exports = Profile;