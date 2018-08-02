import React, { Component } from 'react';
import './MaternalMortalityRates.css';
import bubble from './../images/bubblechart.png';
import bar from './../images/barchart.png';
import NavBar from './NavBar';
import JumbotronTwo from './JumbotronTwo.js';


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
           <div className='col-md-6'>
              <img className="graphic" alt="" src={bar} />
                 <p><a className="btn btn-secondary" href="/mmrbarcharts" role="button">Bar Charts »</a></p>
           </div>
          <div className='col-md-6'>
           <img className="graphic" alt="" src={bubble}/>
               <p><a className="btn btn-secondary" href="/mmrbubblecharts" role="button">Bubble Charts »</a></p>
          </div>
      </div>
  </div>
  );
   }
}

export default MaternalMortalityRates;
