import React, { Component } from 'react';
import DatasetsContainer from './components/DatasetsContainer';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Health Data Tool</h1>
        </header>
      <DatasetsContainer />
      </div>
    );
  }
}

export default App;
