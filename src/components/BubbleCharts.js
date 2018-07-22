import React, { Component } from 'react';
import { render } from 'react-dom';
import { VictoryChart,
  VictoryScatter,
  VictoryClipContainer
 } from 'victory';
import './Victory.css';
import jsonData from '../data/mmr.json';

class BubbleCharts extends Component {

  constructor(props){
   super(props)
     this.state = {
       data: jsonData
     };
  }


  render() {
    return (

<div className="container-fluid">

        <VictoryChart style={{ parent: { maxWidth: "50%" } }} className="bubbleCharts">
        <VictoryChart>
           <VictoryScatter
             groupComponent={<VictoryClipContainer/>}
             style={{ data: { fill: "#c43a31" } }}
             bubbleProperty="amount"
             maxBubbleSize={25}
             minBubbleSize={5}
             data={[
               { x: 1, y: 2, amount: 30 },
               { x: 2, y: 3, amount: 40 },
               { x: 3, y: 5, amount: 25 },
               { x: 4, y: 4, amount: 10 },
               { x: 5, y: 7, amount: 45 }
             ]}
             size={20}
           />
         </VictoryChart>
        </VictoryChart>

</div>
    );
  }
}

export default BubbleCharts;
