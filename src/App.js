import React, { Component } from 'react';
// import { Route, Router, BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import Search from './components/Search';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Health Data Tool</h1>
        </header>

        <main>
         <Route exact path='/' component={Search}/>
        </main>
      </div>
    );
  }
}

export default App;
