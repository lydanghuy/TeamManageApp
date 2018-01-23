import React, { Component } from 'react'
import {Route, Link} from 'react-router-dom'
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap'
import axios from 'axios'
var style={
  width: '500px',

}
export default class CreateProject extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        name: ""
      };
    }

    validateForm() {
      return this.state.name.length>0;
    }
    handleChange = event => {
      this.setState({
        [event.target.id]: event.target.value
      });
    }

    register(){
      axios({
        method: 'post',
        data:{
          'projectName': this.state.name
        },
        url: "/api/projects"
      }).then((response)=>{
        window.location.assign("http://localhost:3000/projects/"+response.data.project._id)
      })
    }

    handleSubmit = event => {
      event.preventDefault();
      this.register();
    }
  
    render() {
      return (
        <div className="container Login">
          <form onSubmit={this.handleSubmit}>
          <FormGroup className="mx-auto" style={style} controlId="name" bsSize="large">
              <ControlLabel>Project Name</ControlLabel>
              <FormControl
                autoFocus
                type="text"
                value={this.state.name}
                onChange={this.handleChange}
              />
            </FormGroup>
            
            <Button style={style} className="su-btn mx-auto button"
              block
              bsSize="large"
              disabled={!this.validateForm()}
              type="submit"
            >
            Create
            </Button>
                
          </form>
        </div>
      );
    }
  }