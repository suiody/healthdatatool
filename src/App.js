import React, { Component } from 'react';
// import { Route, Router, BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import About from './components/About';
import DHS from './components/DHS';
import WorldBank from './components/WorldBank';
import Archives from './components/Archives';
import './App.css';

class App extends Component {

  render() {

    return (
      <div className="App">
        <main>
        <Route exact path='/' component={About}/>
         <Route exact path='/dhs' component={DHS}/>
         <Route exact path='/worldbank' component={WorldBank}/>
         <Route exact path='/archives' component={Archives}/>
        </main>
      </div>
    );
  }
}

export default App;
