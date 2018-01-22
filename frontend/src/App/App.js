import React, { Component } from 'react';
import logo from '../Images/logo.svg';
import Header from '../Components/Header/header.js'
import Main from '../Components/Main/main.js'

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Main />
      </div>
    );
  }
}

export default App;
