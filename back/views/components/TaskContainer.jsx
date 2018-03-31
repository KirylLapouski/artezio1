var React = require("react");
var Task = require("./Task.jsx");
var config = require('../../etc/config.json');
var Parser = require('html-react-parser');

class TaskContainer extends React.Component{
    constructor(props){
        super(props);

        this.state={
            paginatorCurrentNumber:1
        }
          this.createPaginator = this.createPaginator.bind(this);
          this.onPaginatorClick = this.onPaginatorClick.bind(this);
          this.onLeftArrowClick = this.onLeftArrowClick.bind(this);
          this.onRightArrowClick = this.onRightArrowClick.bind(this);
    }
   /* addTask(){
          
        var xhr = new XMLHttpRequest();
        xhr.open('POST', config.rootUrl+config.dbApi+'/'+req.body.userName+'/');
    }*/
    getUsers(){
        var xhr =  new XMLHttpRequest();
        xhr.open('GET',  config.rootUrl+config.dbApi,false);
        xhr.setRequestHeader('Content-Type', 'application/json');
        
        xhr.send();
        
        if(xhr.status == 200){
            return xhr.responseText;
        }
    }
    
    onPaginatorClick(e){
        this.setState({paginatorCurrentNumber:e.target.getAttribute("data-key")});

    }
    onLeftArrowClick(){
        this.setState({
            paginatorCurrentNumber: this.state.paginatorCurrentNumber-1
        })
    }
    onRightArrowClick(){
        this.setState({
            paginatorCurrentNumber : this.state.paginatorCurrentNumber+1
        })
    }
    createPaginator(){
        if(this.props.length>10){

            var leftArrow =  <li onClick={this.onLeftArrowClick} className={this.state.paginatorCurrentNumber==1?"page-item disabled":"page-item"}>
                                    <a className="page-link" href="#" aria-label="Previous">
                                        <span aria-hidden="true">&laquo;</span>
                                        <span className="sr-only">Previous</span>
                                    </a>
                                </li>
            var rightArrom =   <li onClick={this.onRightArrowClick} className={this.state.paginatorCurrentNumber==Math.floor(this.props.length/10+1)?"page-item disabled":"page-item"}>
                                    <a className="page-link" href="#" aria-label="Next">
                                        <span aria-hidden="true">&raquo;</span>
                                        <span className="sr-only">Next</span>
                                    </a>
                                </li>
            var paginatorNumbers = [];
            for(let i=0;i<this.props.length/10;i++){
                paginatorNumbers[i] = <li key={i+1} onClick={this.onPaginatorClick} className="page-item">
                                        <a data-key={i+1} className="page-link" href="#">{i+1}{this.state.paginatorCurrentNumber==i?Parser('<span class="sr-only">(current)</span>'):""}
                                        </a>
                                    </li>;
            }

            return <nav style={{display:"flex",justifyContent:"center"}}> 
                        <ul className="pagination pg-blue">
                            {leftArrow}
                                {paginatorNumbers}
                            {rightArrom}
                        </ul>
                    </nav>
        }
    }

    render(){

                var users = JSON.parse(this.getUsers());
                if(users instanceof Array==false)
                    users = [users];
                
                users = users.slice();
                this.props = {length:users.length};
                var usersRes = users.map(function(user){
                    return <Task key={user._id} name={user._id} description={user} />
                });

                var paginator = this.createPaginator();


        return (<div className="list-group" style={{margin:"0 auto", marginTop:'90px', boxShadow:'0 0.210rem 0.710rem rgba(0, 0, 0, .010)', width:"700px",}}> 
                    {usersRes.slice(this.state.paginatorCurrentNumber*10-10,this.state.paginatorCurrentNumber*10< this.props.length?this.state.paginatorCurrentNumber*10:this.props.length)}
                    <button type="button" className="btn btn-outline-primary" style={{marginTop:'3px'}}>Add</button>
                    {paginator}
                </div>);      
    }
}

module.exports = TaskContainer;
