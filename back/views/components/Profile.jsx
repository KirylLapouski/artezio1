var React = require('react');
var config = require('../../etc/config.json');
var toastr = require('toastr');
var Parser = require('html-react-parser');
class Profile extends React.Component{

    constructor(props){
        super(props);

        this.state={
            _id: "",
            firstName: "User",
            lastName: "",
            email: "",
            phoneNumber: "",
            city: "",
            fileName:""            
        }
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.log = this.log.bind(this);
    }

    onChangeHandler(e){
        var {name,value} = e.target;
        this.setState(prevState =>({
            [name]: value
          }));
    }

    log(loaded,total){
        console.log("profile")
        console.log(loaded);
        this.setState({
            progressBar: Math.floor(loaded*100 / total)
        }) 
    }

    upload(file) {

        var data = new FormData();
        data.append('file', file);

        console.log(file);
        var xhr = new XMLHttpRequest();
        // обработчики можно объединить в один,
        // если status == 200, то это успех, иначе ошибка
        xhr.onload = xhr.onerror = function() {
          if (this.status == 200) {
            toastr.success("Image was loaded");
          } else {
            toastr.error("Error when load image");
            }
        };

        var self = this;
        xhr.upload.onprogress = function(event) {
            self.log(event.loaded ,event.total);
        }

        xhr.open("POST",config.dbApi +"/"+ this.state._id +"/image", true);
        xhr.send(data);
    }
    onSubmitHandler(e){
        e.preventDefault();
        
        var form = document.querySelector('form[name="userEdit"]');
        var file = form.elements.imageFile.files[0];
        if (file) {
            this.upload(file);
        }
        
        var xhr =  new XMLHttpRequest();
        xhr.open('PUT', config.rootUrl + config.dbApi,true);
        xhr.setRequestHeader('Content-Type', 'application/json');
    
        //create request body (user changes)
        var user={_id: this.state._id};
        if(this.state.email)
          user.email = this.state.email;
        if(this.state.firstName)
          user.firstName = this.state.firstName;
        if(this.state.lastName)
          user.lastName = this.state.lastName;
        if(this.state.phoneNumber)
          user.phoneNumber = this.state.phoneNumber;
        if(this.state.city)
          user.city = this.state.city;
    
    
      
        xhr.onload = ()=>{ 
          if(xhr.status == 200){
              
              localStorage.setItem('currentUser',JSON.stringify(user));
              toastr.success('User was edited successful');
          }else{
            toastr.error('Something goes wrong','User was not edited');

          }
        }
    }
    componentDidMount(){
       setTimeout(()=>{   
           this.setState({
            _id:JSON.parse(localStorage.getItem("currentUser"))._id?JSON.parse(localStorage.getItem("currentUser"))._id:"",
            firstName: JSON.parse(localStorage.getItem("currentUser")).firstName?JSON.parse(localStorage.getItem("currentUser")).firstName:"User",
            lastName:JSON.parse(localStorage.getItem("currentUser")).lastName?JSON.parse(localStorage.getItem("currentUser")).lastName:"",
            email: JSON.parse(localStorage.getItem("currentUser")).email?JSON.parse(localStorage.getItem("currentUser")).email:"",
            phoneNumber: JSON.parse(localStorage.getItem("currentUser")).phoneNumber?JSON.parse(localStorage.getItem("currentUser")).phoneNumber:"",
            city: JSON.parse(localStorage.getItem("currentUser")).city?JSON.parse(localStorage.getItem("currentUser")).city:"",
        })},0);

        //load image there
        setTimeout(function(){
            var xhr =  new XMLHttpRequest();
            xhr.open('GET', config.rootUrl + config.dbApi +'/'+ JSON.parse(localStorage.getItem("currentUser"))._id + '/image',true);
            xhr.responseType = "arraybuffer";

            xhr.onload = function(){
                
                if(xhr.status == 404){
                    toastr.info("You do not have a photo");
                }else{
                    var arrayBufferView = new Uint8Array(this.response);

                    var blob = new Blob([arrayBufferView],{type:this.responseType})
                    var urlCreator = window.URL || window.webkitURL;
                    var imageUrl = urlCreator.createObjectURL(blob);
                    var img = document.querySelector(".img-fluid");
                    img.src = imageUrl;
                }
              
            }

            xhr.send();            
        },300);

    }
    render(){

    return <div className="row" style={{maxWidth:"1200px" ,marginTop:"10vh"}}>
                <div className="col-4">
                
                <div className="card card-cascade">

                        <div className="view overlay">
                            <img src="https://mdbootstrap.com/img/Photos/Others/men.jpg" className="img-fluid" alt=""/>
                            <a>
                                <div className="mask rgba-white-slight"></div>
                            </a>
                        </div>

                        <div className="card-body text-center">
                            <h4 className="card-title"><strong>{this.state.firstName +" " + this.state.lastName}</strong></h4>

                            <p>
                            {this.state.email?"Email: "+ this.state.email:""} {this.state.email?Parser("<br/>"):""}
                            {this.state.city?"City: "+ this.state.city:""}{this.state.city?Parser("<br/>"):""}
                            {this.state.phoneNumber?"Phone number: "+ this.state.phoneNumber:""} {this.state.phoneNumber?Parser("<br/>"):""}                            
                            </p> 

                        </div>
                </div>
            </div>
                <div className="col-8" style={{textAlign:"left"}}>
                    <div className="card" >
                            <form name="userEdit" style={{padding:"40px"}}>
                                <p><b>Edit profile</b></p>                            
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputEmail4">First Name</label>
                                        <input onChange={this.onChangeHandler} name="firstName" type="text" className="form-control" id="inputEmail4" placeholder="Kirill"/>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputPassword4">lastName</label>
                                        <input onChange={this.onChangeHandler} name="lastName" type="text" className="form-control" id="inputPassword4" placeholder="Lapkovsky"/>
                                    </div>
                                </div>
                                                
                                <div className="form-group">
                                    <label htmlFor="inputEmail">Email</label>
                                    <input onChange={this.onChangeHandler} type="email" name="email" id="inputEmail" className="form-control" placeholder="lapkovskyk@mail.ru"/>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputCity">City</label>
                                        <input onChange={this.onChangeHandler} name="city" type="text" className="form-control" id="inputCity" placeholder="New York City"/>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputZip">Phone Number</label>
                                        <input onChange={this.onChangeHandler} name="phoneNumber" type="text" className="form-control" id="inputZip" placeholder="+ 375 25 545 55 09"/>
                                    </div>
                                </div>
                                <div className="form-group">
                                        <label htmlFor="inputGroupFile01">Photo</label><br/>
                                        <div className="custom-file">
                                            <input name="imageFile" type="file" className="custom-file-input" id="inputGroupFile01"/>
                                            <label  className="custom-file-label" htmlFor="inputGroupFile01">{document.querySelector?this.state.fileName:"Choose file"}</label>
                                        </div>
                                </div>
                                <button type="button" onClick={this.onSubmitHandler} className="btn btn-primary btn-md">Change</button>
                            </form>
                        </div>
                    </div>
            </div>
    }
}

module.exports = Profile;