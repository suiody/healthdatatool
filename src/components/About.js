import React, { Component } from 'react';
import NavBar from './NavBar.js';
import Jumbotron from './Jumbotron.js';


class About extends Component {
  render() {
    return (
  <div>
    <NavBar />
    <Jumbotron className="jumbotron-fluid" title="Health Data Information"/>
  </div>
    );
  }
}


export default About;
