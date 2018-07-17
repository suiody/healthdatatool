import React, { Component } from 'react';
import { render } from 'react-dom';
import { VictoryChart,
  VictoryPie
 } from 'victory';
import './Victory.css';

class PieCharts extends Component {
  render() {
    return (

        <VictoryChart style={{ parent: { maxWidth: "50%" } }} className="pieCharts">
          <VictoryPie
            colorScale={[ "orange","cyan", "navy" ]}
             data={[
               { x: "Cats", y: 35 },
               { x: "Dogs", y: 40 },
               { x: "Birds", y: 55 }
             ]}
          />
      </VictoryChart>

    );
  }
}

export default PieCharts;
