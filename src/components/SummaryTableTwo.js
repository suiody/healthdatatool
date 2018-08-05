import React, { Component } from 'react';
import './SummaryTables.css';

class SummaryTableTwo extends Component {
  render(){
    return(
     <div className="summary">
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
             <td>987</td>
             <td>928</td>
             <td>846</td>
             <td>717</td>
             <td>624</td>
             <td>546</td>
           </tr>
           <tr>
             <td>Eastern and Southern Africa</td>
             <td>926</td>
             <td>858</td>
             <td>755</td>
             <td>636</td>
             <td>509</td>
             <td>417</td>
           </tr>
           <tr>
             <td>West and Central Africa</td>
             <td>1,070</td>
             <td>1,020</td>
             <td>956</td>
             <td>814</td>
             <td>749</td>
             <td>679</td>
           </tr>
           <tr>
             <td>Middle East and North Africa</td>
             <td>221</td>
             <td>198</td>
             <td>170</td>
             <td>145</td>
             <td>122</td>
             <td>110</td>
           </tr>
           <tr>
             <td>South Asia</td>
             <td>558</td>
             <td>476</td>
             <td>388</td>
             <td>296</td>
             <td>228</td>
             <td>182</td>
           </tr>
           <tr>
             <td>East Asia and Pacific</td>
             <td>165</td>
             <td>134</td>
             <td>118</td>
             <td>98</td>
             <td>78</td>
             <td>62</td>
           </tr>
           <tr>
             <td>Latin America and Caribbean</td>
             <td>135</td>
             <td>117</td>
             <td>99</td>
             <td>88</td>
             <td>81</td>
             <td>68</td>
           </tr>
           <tr>
             <td>CEE/CIS</td>
             <td>69</td>
             <td>71</td>
             <td>56</td>
             <td>43</td>
             <td>29</td>
             <td>25</td>
           </tr>
           <tr>
             <td>World</td>
             <td>385</td>
             <td>369</td>
             <td>341</td>
             <td>288</td>
             <td>246</td>
             <td>216</td>
           </tr>
         </tbody>
       </table>
    </div>
  </div>
</div>
    );

  }

}

export default SummaryTableTwo;
