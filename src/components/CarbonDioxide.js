import React, { Component } from 'react';
import NavBar from './NavBar.js';
import Jumbotron from './Jumbotron.js';


class CarbonDioxide extends Component {
  render() {
    return (
  <div>
    <NavBar />
    <Jumbotron title="Health Data Information"/>
        <p>CO2 data will go here</p>
  </div>
    );
  }
}


export default CarbonDioxide;
