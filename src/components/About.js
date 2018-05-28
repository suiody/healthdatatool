import React, { Component } from 'react';
import NavBar from './NavBar.js';
import Jumbotron from './Jumbotron.js';


class About extends Component {
  render() {
    return (
  <div>
    <NavBar />
    <Jumbotron title="Health Data Information"/>
     <div className="container-fluid">
       <h1>Health Data Tool</h1>
       <br />
       <h3>The Health Data Tool is a simple web app for accessing and downloading public health information from popular development databases.</h3>
     </div>
  </div>
    );
  }
}


export default About;
