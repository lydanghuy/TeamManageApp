import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
export default class List extends Component{
    constructor(props){
        super(props);
        this.state={
            list: []
        }
        // console.log(this.props.match.params.type)
    }

    componentWillMount(){
        axios.get("/api/projects/")
            .then((response)=>{
                this.setState({
                    list: response.data
                })
            })
    }
    
    render(){
        // console.log(this.state.list)
        var rows = this.state.list.map(function(lists) {
            var cells = [];
            cells.push(<td className="col-9"><Link to={`/projects/${lists._id}`}>{lists.projectName}</Link></td>);
            cells.push(<td className="col-3">{lists.listMember.length}</td>);
            return <tr className="d-flex">{cells}</tr>;
          });
        return(
            <div className="container justify-content-center">
            <table className="table">
                <thead>
                    <tr className="d-flex">
                        <th className="col-9">Project Name</th>
                        <th className="col-3">Number of members</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        </div>
        )
    }
}