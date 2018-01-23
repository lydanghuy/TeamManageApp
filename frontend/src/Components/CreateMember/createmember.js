import React, { Component } from 'react'
import {Route, Link} from 'react-router-dom'
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap'
import axios from 'axios'
var style={
  width: '500px',

}
export default class CreateMember extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        name: "",
        phone: ""
      };
    }

    validateForm() {
      return this.state.name.length>0 && this.state.phone.length > 9 && this.state.phone.length <12;
    }
    handleChange = event => {
      this.setState({
        [event.target.id]: event.target.value
      });
    }

    register(){
      axios({
        method: 'post',
        url: "/api/members/createMember",
        data: this.state
      })
      .then((response)=>{
        alert(response.data.message);
        console.log(response.data.message);
        window.location.assign("http://localhost:3000/");

      })
      .catch((error)=>{
        alert(error.response.data.err);
        console.log(error.response.data.err);
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
              <ControlLabel>Name</ControlLabel>
              <FormControl
                autoFocus
                type="text"
                value={this.state.name}
                onChange={this.handleChange}
              />
            </FormGroup>
            
            <FormGroup className="mx-auto" style={style} controlId="phone" bsSize="large">
              <ControlLabel>Phone</ControlLabel>
              <FormControl
                type="number"
                value={this.state.phone}
                onChange={this.handleChange}
                placeholder="09xxxxxxxx"
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