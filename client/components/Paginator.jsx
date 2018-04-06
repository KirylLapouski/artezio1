var React = require("react");
var Task = require("./Task.jsx");
var config = require('../../config.json');
var Parser = require('html-react-parser');
class Paginator extends React.Component {

    leftArrow() {
        return <li onClick={this.props.onLeftArrowClick} className={this.props.paginatorCurrentNumber == 1 ? "page-item disabled" : "page-item"}>
            <a className="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
                <span className="sr-only">Previous</span>
            </a>
        </li>
    }

    rightArrom() {
        return <li onClick={this.props.onRightArrowClick} className={this.props.paginatorCurrentNumber == Math.floor(this.props.length / 10 + 1) ? "page-item disabled" : "page-item"}>
            <a className="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
                <span className="sr-only">Next</span>
            </a>
        </li>
    }

    paginatorNumbers() {
        var paginatorNumbers = [];
        for (let i = 0; i < this.props.length / 10; i++) {
            paginatorNumbers[i] = <li key={i + 1} onClick={this.props.onPaginatorNumberClick} className="page-item">
                <a data-key={i + 1} className="page-link" href="#">{i + 1}{this.props.paginatorCurrentNumber == i ? Parser('<span class="sr-only">(current)</span>') : ""}
                </a>
            </li>;
        }

        return paginatorNumbers;
    }



    render() {
        if (this.props.length > 10) {

            var leftArrow = this.leftArrow();
            var rightArrom = this.rightArrom();
            var paginatorNumbers = this.paginatorNumbers();

            return (<nav style={{ display: "flex", justifyContent: "center" }}>
                <ul className="pagination pg-blue">
                    {leftArrow}
                    {paginatorNumbers}
                    {rightArrom}
                </ul>
            </nav>)
        }else 
            return null
    }
}

module.exports = Paginator;