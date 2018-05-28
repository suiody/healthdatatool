import React, { Component } from 'react';
import { PageHeader } from 'react-bootstrap';
import NavBar from './NavBar.js';
import Jumbotron from './Jumbotron.js';


class About extends Component {
  render() {
    return (
  <div>
    <NavBar />
    <Jumbotron title="Health Data Information"/>
     <div className="container-fluid">
       <h1>About text will go here.</h1>
     </div>
  </div>
    );
  }
}


export default About;
