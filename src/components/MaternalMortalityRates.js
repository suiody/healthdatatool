import React, { Component } from 'react';
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
               <img className="graphic" width={300} height={250} alt="" src={bar} />
              <p><a className="btn btn-secondary" href="/mmrbarcharts" role="button">Bar Charts »</a></p>
            </div>
            <div className="col-md-4">
              <img className="graphic" width={300} height={250} alt="" src={bubble}/>
              <p><a className="btn btn-secondary" href="/mmrbubblecharts" role="button">Bubble Charts »</a></p>
            </div>
          </div>
            <div className="col-md-8">
             <h3>Useful Links</h3>
               <div className="externalLinks">
               <a href="http://www.unwomen.org/en">UN WOMEN</a>
               <a href="http://www.who.int/topics/womens_health/en/">WORLD HEALTH ORGANIZATION</a>
               <a href="https://orwh.od.nih.gov/">NATIONAL INSTITUTES OF HEALTH</a>
               <a href="https://www.cdc.gov/nchs/fastats/womens-health.htm">CENTER FOR DISEASE CONTROL</a>
               <a href="https://www.swanstudy.org/">SWAN</a>
               <a href="http://datatopics.worldbank.org/gender/">UN GENDER DATA PORTAL</a>
            </div>
          </div>

        </div>
      </main>

  </div>
  );
   }
}

export default MaternalMortalityRates;
