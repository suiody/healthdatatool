import React, { Component } from 'react';
import './MaternalMortalityRates.css';
import bubble from './../images/bubblechart.png';
import bar2 from './../images/child.png';
import NavBar from './NavBar';
import JumbotronTwo from './JumbotronTwo.js';
import SummaryTableOne from './SummaryTableOne.js';
import SummaryTableTwo from './SummaryTableTwo.js';


class MaternalMortalityRates extends Component {

render(){
  return(
     <div>
      <NavBar />
       <JumbotronTwo />
        <div className="container">
          <aside>
            <table className="table table-hover table-dark">
              <thead>
                <tr>
                  <th scope="col">Useful Links</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><a href="http://www.unwomen.org/en">UN Women</a></td>
                </tr>
                <tr>
                  <td><a href="http://www.who.int/topics/womens_health/en/">WORLD HEALTH ORGANIZATION</a></td>
                </tr>
                <tr>
                  <td><a href="https://orwh.od.nih.gov/">NATIONAL INSTITUTES OF HEALTH</a></td>
                </tr>
                <tr>
                  <td><a href="https://www.cdc.gov/nchs/fastats/womens-health.htm">CENTER FOR DISEASE CONTROL</a></td>
                </tr>
                <tr>
                  <td><a href="https://www.swanstudy.org/">SWAN</a></td>
                </tr>
                <tr>
                  <td><a href="http://datatopics.worldbank.org/gender/">UN Gender Data Portal</a></td>
                </tr>
              </tbody>
            </table>
          </aside>

        <div className='countryGraphs'>
          <div className='col-md-4'>
          <div className="titles">
            <h6>Maternal Mortality Rate</h6>
            <p>Graph by Country</p>
          </div>
           <img className="graphic" alt="" src={bubble}/>
               <p><a className="btn btn-secondary" href="/mmrbubblecharts" role="button">Bubble Charts »</a></p>
          </div>
          <div className='col-md-4'>
            <div className="titles">
              <h6>Child & Infant Mortality Rates</h6>
              <p>Graph by country</p>
            </div>
               <img className="graphic" alt="" src={bar2} />
                  <p><a className="btn btn-secondary" href="/archives" role="button">Bar Charts »</a></p>
            </div>
         </div>

          <div className='summary-tables'>
            <div className='table-captions'>
              <h4 className='media-body'>Summary Tables</h4>
            </div>
              <SummaryTableOne />
              <SummaryTableTwo />
          </div>

    </div>
  </div>
  );
   }
}

export default MaternalMortalityRates;
