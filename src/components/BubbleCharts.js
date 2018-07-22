import React, { Component } from 'react';
import { render } from 'react-dom';
import { VictoryChart,
  VictoryScatter,
  VictoryClipContainer
 } from 'victory';
import './BubbleChart.css';
import jsonData from '../data/mmr_countries.json';


class BubbleCharts extends Component {
  constructor(props){
   super(props)
     this.state = {
       alldata: jsonData,
       countries: [],
       selectedCountry: "",
       data: []
     };
    this.keyCount = 0;
  }

 componentDidMount(){
   var countriesData = Object.keys(this.state.alldata);
    if (countriesData.length > 1){
      countriesData.unshift("Select a country");
      this.setState({countries: countriesData});
    }
  }

  getKey(){
    return this.keyCount++;
  }

  handleCountry(e){
    var selectedCountry = e.target.value;
    console.log("selected country", selectedCountry);
    this.setState({ selectedCountry: selectedCountry });
    if (selectedCountry.length > 1){
      this.populateData(selectedCountry);
    }
  }

  populateData(selectedCountry){
    console.log("populateData called");
    if(selectedCountry.length > 1){
     var data = this.state.alldata;
       if (Object.keys(data).length > 1){
          var country = Object.entries(data).filter(function(country){
            if(country[0].trim() === selectedCountry){
              return country.shift();
            }
          });
       }
    }
    if (country.length > 0){
      console.log("country data values: ", country);
      this.formatData(country);
    }
  }

  // format data from { year: value } to {x: year, y: value} for graphing
  formatData(country){
    console.log("formatData called");
    let data = [];
    if (Object.entries(country).length > 0){
      Object.entries(country).forEach(function(key,value){
        data.push({x: key.toString(), y: value});
      });
    }
    if (data.length > 1){
      this.setState({ data: data });
      console.log("data", data);
    }
  }

  // need to load the data based on state, may need to reformat...not working yet
  // plus have some default data with condition

  render() {
    return (
      <div className="container-fluid">
      <select className="dropDown" onChange={(e) => this.handleCountry(e)}>
       {
         this.state.countries.map((country) =>
          <option key={this.getKey()}>{country ? country : "Select a country"}</option>
         )
       }
      </select>

        <VictoryChart style={{ parent: { maxWidth: "50%" } }} className="bubbleCharts">
        <VictoryChart>
           <VictoryScatter
             groupComponent={<VictoryClipContainer/>}
             style={{ data: { fill: "#c43a31" } }}
             maxBubbleSize={8}
             minBubbleSize={8}
             data={[
               { x: "1990", y: 1340 },
               { x: "1995", y: 1270 },
               { x: "2000", y: 1100 },
               { x: "2005", y: 821 },
               { x: "2010", y: 584 },
               { x: "2011", y: 536 },
               { x: "2012", y: 496 },
               { x: "2013", y: 459 },
               { x: "2014", y: 425 },
               { x: "2015", y: 396 }
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
