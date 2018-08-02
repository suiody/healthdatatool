import React, { Component } from 'react';
import { VictoryChart,
  VictoryScatter,
  VictoryClipContainer,
  VictoryLabel
 } from 'victory';
import './BubbleChart.css';
import html2canvas from 'html2canvas';
import jsonData from '../data/reformatted_mmr_v2.json';
import NavBar from './NavBar.js';

class MMRBubbleCharts extends Component {
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
    this.setState({ selectedCountry: selectedCountry });
    if (selectedCountry.length > 1){
      this.populateData(selectedCountry);
    }
  }

  populateData(selectedCountry){
    let country = {};
    if(selectedCountry.length > 1){
     var data = this.state.alldata;
       if (Object.keys(data).length > 1){
         if(data[selectedCountry]){
           country = data[selectedCountry];
         }
      }
    }
    if (Object.keys(country).length > 0 ){
        this.formatData(country);
    }
  }

  // format data from { x1: value, y1: value } to {x: value, y: value} for graphing
  formatData(country){
    let data = [];
    let values = Object.values(country);
    let f = 0;
    let s = 1;
    for (let i = 0; i < values.length/2; i++){
     let x = values[f];
     let y = values[s];
     data.push({x: x.toString(), y: y});
     f = s+1
     s+= 2;
    }
    if (data.length > 1){
      this.setState({data: data});
    }
  }

  saveImage(){
    var input = document.getElementById('canvas');
    html2canvas(input)
    .then((canvas) =>{
      let imgData = canvas.toDataURL('image/png').replace("image/png", "image/octet-stream");
       this.downloadURL(imgData);
    });
  }

  // function to download image to user's desktop
  downloadURL(imgData){
    var a = document.createElement('a');
    a.href = imgData.replace("image/png", "image/octet-stream");
    a.download = 'graph.png';
    a.click();
  }

  render() {
    let date = new Date();
    let dateStr = date.toISOString().slice(0,10);
    return (
    <div>
    <NavBar />
      <div className="container-fluid">
        <div className="menus">
          <select className="dropDown" onChange={(e) => this.handleCountry(e)}>
           {
             this.state.countries.map((country) =>
              <option key={this.getKey()}>{country ? country : "Select a country"}</option>
             )
           }
          </select>
        </div>
      <div className="plotBox" id="canvas">
          <VictoryChart
            style={{ parent: { maxWidth: "90%" } }}
            className="bubbleCharts">
          <VictoryChart>
              <VictoryLabel
                text="Maternal Mortality Rates (deaths per 100,000 live births)"
                x={225} y={5}
                textAnchor="middle"
              />
              <VictoryLabel
                text={this.state.selectedCountry}
                x={225} y={20}
                textAnchor="middle"
              />
             <VictoryScatter
               groupComponent={<VictoryClipContainer/>}
               style={{ data: { fill: "#c43a31" } }}
               data={this.state.data}
               size={15}
             />
           </VictoryChart>
          </VictoryChart>
        </div>
        <button className="btn btn-primary" onClick={() => this.saveImage()}>Save PNG</button>
        <div className="citation">
          <p className="citation">Source: UN Maternal Mortality Estimation Group (2016). <br />Maternal mortality data.[Accessed {dateStr}]</p>
      </div>
</div>
</div>
    );
  }
}

export default MMRBubbleCharts;
