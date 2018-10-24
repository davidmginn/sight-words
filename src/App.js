import React, { Component, Fragment } from "react";
import vmaLogo from './images/VillaMadonnaAcademy.jpg';
import "./App.css";
import "./sight-words";
import SightWords from "./sight-words";

class App extends Component {
  render() {
    return (
      <Fragment>
        <div className="App">
          <header className="App-header">
            <img src={vmaLogo} className="App-logo" alt="logo" />
            <h1 className="App-title">Kindergarten Sight Words</h1>
          </header>
          <div>
            <SightWords />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default App;
