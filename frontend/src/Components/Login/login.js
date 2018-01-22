import React, { Component } from 'react'
import {Route, Link} from 'react-router-dom'
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap'

import { browserHistory, Redirect, Switch } from 'react-router';

class loginForm extends Component{
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  

  async login(){
    let response = await fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    });
    let responseJSON = await response.json();

    if (responseJSON.success) {
      localStorage.setItem("token",responseJSON.token);
    }else{
      alert('Please check your username and password again')
    }
  }

  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => {
      event.preventDefault();
      console.log(this.state);
      await this.login();
      window.location.reload(); 
  }

  render(){
    return (
      <div className="container Login">
    <form onSubmit={this.handleSubmit}>
      <FormGroup controlId="username" bsSize="large">
        <ControlLabel>Username</ControlLabel>
        <FormControl

          autoFocus
          type="username"
          value={this.state.username}
          onChange={this.handleChange}
        />
      </FormGroup>
      <FormGroup controlId="password" bsSize="large">
        <ControlLabel>Password</ControlLabel>
        <FormControl
          value={this.state.password}
          onChange={this.handleChange}
          type="password"
        />
      </FormGroup>
      <form className="form-inline justify-content-between">
          <Button className="button btn-primary"
          block
          bsSize="large"
          disabled={!this.validateForm()}
          type="submit"
          >
          Login
          </Button>
      </form>
    </form>
  </div>)
  }
}

export default class Login extends Component {
    constructor(props){
      super(props);
      const status = localStorage.getItem("token")!=null?true:false;
      this.state={
        status: status
      }
      console.log(this.state.status);
    }

    render() {
      if(this.state.status) return <Redirect to='/'/>          
     
        return(
          <div>
            <Route path='/login' component={loginForm}></Route>
          </div>
        )
      }
    }