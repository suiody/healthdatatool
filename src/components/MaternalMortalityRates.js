import React, { Component } from 'react';
import { Link } from "react-router-dom";
import NavBar from './NavBar';
import './MaternalMortalityRates.css';
import bubble from './../images/bubblechart.png';
import bar from './../images/barchart.png';
import JumbotronTwo from './JumbotronTwo.js';


class MaternalMortalityRates extends Component {

render(){
  return(
    <div className="container-fluid">
      <NavBar />
      <main role="main">
       <JumbotronTwo />
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h3>Bar Charts</h3>
               <img className="graphic" width={300} height={250} alt="" src={bar} />
              <p><a className="btn btn-secondary" href="/mmrbarcharts" role="button">Bar Charts »</a></p>
            </div>
            <div className="col-md-4">
              <h3>Bubble Charts</h3>
              <img className="graphic" width={300} height={250} alt="" src={bubble}/>
              <p><a className="btn btn-secondary" href="/mmrbubblecharts" role="button">Bubble Charts »</a></p>
            </div>
          </div>
        </div>
      </main>

  </div>
  );
   }
}

export default MaternalMortalityRates;
