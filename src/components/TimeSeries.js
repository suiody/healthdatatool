import React, { Component } from 'react';
import { render } from 'react-dom';
import { VictoryChart,
  VictoryZoomContainer,
  VictoryScatter,
  VictoryBar,
  VictoryLine,
  VictoryAxis,
  VictoryPie,
  VictoryGroup,
  VictoryClipContainer
 } from 'victory';
import './Victory.css';

class TimeSeries extends Component {
  render() {
    return (

        <VictoryChart style={{ parent: { maxWidth: "50%" } }} className="timeeries">
          <VictoryAxis/>
          <VictoryAxis dependentAxis/>
          <VictoryLine
            style={{ data: { stroke: "orange" }}}
            y={(data) => Math.sin(2 * Math.PI * data.x)}
          />
          <VictoryScatter
            y={(data) => Math.sin(2 * Math.PI * data.x)}
            samples={25}
            size={5}
            style={{ data: { fill: "tomato" }}}
          />
        </VictoryChart>


    );
  }
}

export default TimeSeries;
