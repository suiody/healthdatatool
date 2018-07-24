import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import About from './components/About';
import DHS from './components/DHS';
import MaternalMortalityRates from './components/MaternalMortalityRates';
import MMRBubbleCharts from './components/MMRBubbleCharts';
import MMRBarCharts from './components/MMRBarCharts';
import Archives from './components/Archives';
import './App.css';

class App extends Component {

  render() {

    return (
      <div className="App">
        <main>
        <Route exact path='/' component={About}/>
         <Route exact path='/dhs' component={DHS}/>
         <Route exact path='/maternalmortalityrates' component={MaternalMortalityRates}/>
         <Route path='/mmrbarcharts' component={MMRBarCharts}/>
         <Route path='/mmrbubblecharts' component={MMRBubbleCharts}/>
         <Route exact path='/archives' component={Archives}/>
        </main>
      </div>
    );
  }
}

export default App;
