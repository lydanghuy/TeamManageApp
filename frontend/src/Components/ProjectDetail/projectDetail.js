import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
var style1={
    'text-align':'center',
}
export default class ProjectDetail extends Component{
    constructor(props){
        super(props);
        this.state={
            detail: [],
            listMember:[],
            assignPhone:""
        }
        // console.log(this.props.match.params.type)
    }

    componentWillMount(){
        axios.get("/api/projects/"+this.props.match.params.id)
            .then((response)=>{
                this.setState({
                    detail: response.data,
                    listMember: response.data.listMember
                })
            })
    }
    
    handleChange = event => {
        this.setState({
          [event.target.id]: event.target.value
        });
      }
    validate(){
        return this.state.assignPhone.length>9&&this.state.assignPhone.length<12
    }
    assign(){
        axios({
            method: 'post',
            url: '/api/projects/'+this.props.match.params.id+'/assign',
            data: {
                "phone": this.state.assignPhone.toString()
            }
        }).then(window.location.reload)
        .catch((error)=>{
            console.log(error.response);
            alert(error.response.data.err);
           
        })
    }

    render(){
        
        var memberList=this.state.listMember.map((members)=>{
            return <p>{members.memberName.name} - {members.memberName.phone}</p>;
        })
        return(
            <div style={style1} className="mt-5 mr-5">
                <p><strong>Project Name:</strong> {this.state.detail.projectName}</p>
                <p><strong>List Member:</strong>{memberList}</p> 
                <form>
                    <p><strong>Assign new member</strong></p>
                    <input id="assignPhone" type="number" value={this.state.assignPhone} onChange={this.handleChange} placeholder="09xxxxxxxxx" />
                    <button type="submit" disabled={!this.validate()} onClick={this.assign.bind(this)}>Assign</button>
                </form>
            </div>
        )
    }
}