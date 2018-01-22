import React, { Component } from 'react'
import {Route, Link} from 'react-router-dom'
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap'

export default class CreateMember extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        name: "",
        phone: "",
        project: ""
      };
    }

    validateForm() {
      return this.state.name.length>0 && this.state.phone.length > 9 && this.state.project.length > 0;
    }
    handleChange = event => {
      this.setState({
        [event.target.id]: event.target.value
      });
    }

    async register(){
      let response = await fetch('/api/users/signup', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state)
      });
      let responseJSON = await response.json();
    
      if (responseJSON.success) {
        alert("success");
        window.location.assign("https://motorbikeforum.herokuapp.com/login")
        // console.log(userid);
        // console.log(localStorage.getItem("userID"));
      }
      else alert("Your username has been already registered.")
    }

    handleSubmit = event => {
      event.preventDefault();
      this.register();
    }
  
    render() {
      return (
        <div className="container Login">
          <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="name" bsSize="large">
              <ControlLabel>Name</ControlLabel>
              <FormControl
                autoFocus
                type="textt"
                value={this.state.name}
                onChange={this.handleChange}
              />
            </FormGroup>
            
            <FormGroup controlId="phone" bsSize="large">
              <ControlLabel>Phone</ControlLabel>
              <FormControl
                
                type="number"
                value={this.state.phone}
                onChange={this.handleChange}
              />
            </FormGroup>
            <Button className="su-btn button"
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