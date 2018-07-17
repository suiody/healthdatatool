import React, { Component } from 'react';
import { render } from 'react-dom';
import { VictoryChart,
  VictoryBar
 } from 'victory';
import './Victory.css';

class BarCharts extends Component {
  render() {
    return (
        <VictoryChart domainPadding={{x: 50, y: 5}} style={{ parent: { maxWidth: "50%" } }} className="barCharts">

          <VictoryBar
            data={[
              { x: 1, y: 2, y0: 1 },
              { x: 2, y: 3, y0: 2 },
              { x: 3, y: 5, y0: 2 },
              { x: 4, y: 4, y0: 3 },
              { x: 5, y: 6, y0: 3 }
            ]}
          />
  </VictoryChart>
    );
  }
}

export default BarCharts;
