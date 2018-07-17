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

class Victory extends Component {
  render() {
    return (

      <div style={{ display: "flex", flexWrap: "wrap" }} className="graphsDiv">
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
      </div>

    );
  }
}

export default Victory;
