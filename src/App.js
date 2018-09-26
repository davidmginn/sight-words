import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './sight-words'
import SightWords from './sight-words';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Ethan's Sight Words!</h1>
        </header>
        <div className="App-intro">
          <SightWords />
        </div>
      </div>
    );
  }
}

export default App;
