import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
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
        }).then(window.location.reload);
    }

    render(){
        
        var memberList=this.state.listMember.map((members)=>{
            return <p>{members._id}</p>;
        })
        return(
            <div>
                <p>Project Name: {this.state.detail.projectName}</p>
                <p>List Member:{memberList}</p> 
                <form>
                    <p>Assign new member</p>
                    <input id="assignPhone" type="number" value={this.state.assignPhone} onChange={this.handleChange} placeholder="09xxxxxxxxx" />
                    <button type="submit" disabled={!this.validate()} onClick={this.assign.bind(this)}>Assign</button>
                </form>
            </div>
        )
    }
}