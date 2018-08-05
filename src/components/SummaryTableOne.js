import React, { Component } from 'react';
import './SummaryTables.css';

class SummaryTableOne extends Component {


  render(){
    return(
    <div className='summary'>
      <div className='table-captions'>
        <h6 className='media-body'>Trends in estimates of maternal deaths 1990-2015.</h6>
        <p className='media-body'>Source: WHO, UNICEF, UNFPA, World Bank Group and UNPD (MMEIG) - November 2015</p>
      </div>
      <div className="row">
       <div className='col-md-12'>
         <table className="table table-bordered">
          <thead className="thead-dark">
            <tr>
              <th scope="col">UNICEF Region</th>
              <th scope="col">1990</th>
              <th scope="col">1995</th>
              <th scope="col">2000</th>
              <th scope="col">2005</th>
              <th scope="col">2010</th>
              <th scope="col">2015</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Sub-Saharan Africa</td>
              <td>223,000</td>
              <td>233,000</td>
              <td>236,000</td>
              <td>222,000</td>
              <td>212,000</td>
              <td>210,000</td>
            </tr>
            <tr>
              <td>Eastern and Southern Africa</td>
              <td>100,000</td>
              <td>102,000</td>
              <td>98,000</td>
              <td>91,000</td>
              <td>79,000</td>
              <td>70,000</td>
            </tr>
            <tr>
              <td>West and Central Africa</td>
              <td>116,000</td>
              <td>125,000</td>
              <td>132,000</td>
              <td>126,000</td>
              <td>129,000</td>
              <td>127,000</td>
            </tr>
            <tr>
              <td>Middle East and North Africa</td>
              <td>20,000</td>
              <td>18,000</td>
              <td>15,000</td>
              <td>13,000</td>
              <td>13,000</td>
              <td>12,000</td>
            </tr>
            <tr>
              <td>South Asia</td>
              <td>208,000</td>
              <td>180,000</td>
              <td>147,000</td>
              <td>112,000</td>
              <td>84,000</td>
              <td>66,000</td>
            </tr>
            <tr>
              <td>East Asia and Pacific</td>
              <td>65,000</td>
              <td>43,000</td>
              <td>33,000</td>
              <td>28,000</td>
              <td>23,000</td>
              <td>18,000</td>
            </tr>
            <tr>
              <td>Latin America and Caribbean</td>
              <td>16,000</td>
              <td>14,000</td>
              <td>12,000</td>
              <td>10,000</td>
              <td>8,900</td>
              <td>7,300</td>
            </tr>
            <tr>
              <td>CEE/CIS</td>
              <td>4,900</td>
              <td>4,100</td>
              <td>2,900</td>
              <td>2,400</td>
              <td>1,700</td>
              <td>1,500</td>
            </tr>
            <tr>
              <td>World</td>
              <td>532,000</td>
              <td>486,000</td>
              <td>442,000</td>
              <td>384,000</td>
              <td>389,000</td>
              <td>303,000</td>
            </tr>
          </tbody>
        </table>
       </div>
    </div>
  </div>
    );
  }

}

export default SummaryTableOne;
