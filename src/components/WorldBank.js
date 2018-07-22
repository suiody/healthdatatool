import React, { Component } from 'react';
import { render } from 'react-dom';
import { VictoryPie } from 'victory';
import axios from 'axios';
import NavBar from './NavBar';
import BarCharts from './BarCharts';
import BubbleCharts from './BubbleCharts';
import PieCharts from './PieCharts';
import TimeSeries from './TimeSeries';
import './Victory.css';

class WorldBank extends Component {
  constructor(props) {
   super(props);
 }

render(){
  return(
    <div>
    <NavBar />

<div className="container-fluid" >    
    <div style={{ display: "flex", flexWrap: "wrap" }} className="graphsDiv">
      <BubbleCharts />
    </div>
  </div>
</div>

  );
   }
}

export default WorldBank;
