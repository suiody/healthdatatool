import React, { Component } from 'react';
import axios from 'axios';
import NavBar from './NavBar';
import './react_plot_style.css';
import {XYPlot,XAxis, YAxis,VerticalBarSeries} from 'react-vis';
import './Archives.css';
import html2canvas from 'html2canvas';

class Archives extends Component {

  constructor(props) {
   super(props)
   this.state = {
    infantData: {}, // stores API query for infant mortality rates
    childData: {}, // stores API query for child mortality rates
    selectedCountry: [], // stores user selected country
    countries: ["Select a country"],
    arrDataInf: [], // holds infant mortality for selected country
    arrDataCh: [], // holds child mortality rates for selected country
    indicators: ["Select an indicator","Infant Mortality Rate", "Under Five Mortality Rate"],
    selectedIndicator: [], // stores users indicator selection
    years: [], // stores available years for selected country and indicator
    values: [], // stores available indicator values for selected country
    characteristics: ["Select a category","Total"], // available characteristic label for both mortality rates
    isCountryDisabled: true,
    isIndicatorDisabled: false,
    isCharacteristicDisabled: true,
    data: [] // holds data for current graph
   }
   this.keyCount = 0;
   this.getKey = this.getKey.bind(this);
   this.getInfantMortality = this.getInfantMortality.bind(this);
   this.getChildMortality = this.getChildMortality.bind(this);
   this.handleIndicator = this.handleIndicator.bind(this);
   this.handleCountry = this.handleCountry.bind(this);
   this.handleCharacteristic = this.handleCharacteristic.bind(this);
   this.populateData = this.populateData.bind(this);
   this.getGraph = this.getGraph.bind(this);
   this.handleQuery = this.handleQuery.bind(this);
 }

 componentDidMount(){
   this.getInfantMortality();
 }

 getKey(){
   return this.keyCount++;
 }

async getInfantMortality(){
  var axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL
  })
  try {
   let response = await axiosInstance.get('/infant_mortalities.json')
   if(response.status === 200){
     this.setState({
       infantData: response.data
     })
   }
 } catch(err){
   console.log(err);
   window.alert("There was a problem connecting to the archives. Please try again later, or search one of the other databases.");
   window.location = "/";
 }
 this.getChildMortality();
}

async getChildMortality(){
  var axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL
  })
  try {
   let response = await axiosInstance.get('/under_five_mortalities.json')
   if(response.status === 200){
     this.setState({
       childData: response.data
     })
   }
 } catch(err){
   console.log(err);
   window.alert("There was a problem connecting to the archives. Please try again later, or search one of the other databases.")
   window.location = "/";
 }
}

// extrapolate the relevant data from the datasets returned in the API call
populateData(strIndicator){
  var selectedIndicator = strIndicator;
  var hash = {};
  var tmp = [];
  var uniqCountries = [];

  if (selectedIndicator === "Infant Mortality Rate"){
      var infantData = this.state.infantData;
        if (infantData.length >= 1) {
          var arrDataInf = this.state.arrDataInf;
          infantData.forEach(function(value,index){
             hash = {};
              hash["CountryName"] = value.CountryName;
              hash["SurveyYear"] = value.SurveyYear;
              hash["Indicator"] = value.Indicator;
              hash["CharacteristicLabel"] = value.CharacteristicLabel;
              hash["Value"] = value.Value;
              arrDataInf.push(hash);
          });
          // array to hold country values, contains duplicates
           tmp = [];
           arrDataInf.forEach(function(value,index){
             tmp.push(value.CountryName);
           });
           // some countries are listed multiple times because they have multiple survey years
           uniqCountries = Array.from(new Set(tmp))
          this.setState({ countries: this.state.countries.concat(uniqCountries) });
         }
  } else if(selectedIndicator === "Under Five Mortality Rate"){
    var childData = this.state.childData;
      if (childData.length >= 1) {
        var arrDataCh = this.state.arrDataCh;
        childData.forEach(function(value,index){
            hash = {};
            hash["CountryName"] = value.CountryName;
            hash["SurveyYear"] = value.SurveyYear;
            hash["Indicator"] = value.Indicator;
            hash["CharacteristicLabel"] = value.CharacteristicLabel;
            hash["Value"] = value.Value;
            arrDataCh.push(hash);
        });

         tmp = [];
         arrDataCh.forEach(function(value,index){
           tmp.push(value.CountryName);
         });
         // some countries are listed multiple times because they have multiple survey years

         uniqCountries = Array.from(new Set(tmp))
        this.setState({ countries: this.state.countries.concat(uniqCountries) });
       }
  }
}

 // store the selected indicator in state
  handleIndicator(e){
    var selectedIndicator = e.target.value;
    var strIndicator = selectedIndicator.toString();
    this.setState({selectedIndicator: selectedIndicator});
    this.setState({ isIndicatorDisabled: true });
    this.setState({ isCountryDisabled: false });
    this.populateData(strIndicator);
  }

  // store the selected country from dropdown menu in state
   handleCountry(e){
     var selectedCountry = e.target.value;
     this.setState({ selectedCountry: selectedCountry });
     this.setState({ isCountryDisabled: true });
     this.setState({ isCharacteristicDisabled: false });
   }

 // store selected characterstic in state
 handleCharacteristic(e){
   var selectedCharacteristic = e.target.value;
   this.setState({selectedCharacteristic: selectedCharacteristic});
   var strCharGroup = selectedCharacteristic;
   this.getGraph(strCharGroup, this.state.selectedCountry, this.state.selectedIndicator);
 }

 getGraph(strCharGroup, selectedCountry, selectedIndicator){
   var years = this.state.years;
   var values = this.state.values;
   var xAxisCategories = [];
   var yAxisValues = [];
   var data = this.state.data;
   var key;
   var value;

   if (selectedIndicator === "Infant Mortality Rate"){
     var arrDataInf = this.state.arrDataInf;
      arrDataInf.forEach(function(value,index){
       if (value.CountryName === selectedCountry){
         years.push(value.SurveyYear);
         values.push(value.Value);
       }
       });
       this.setState({years: years, values: values });

       xAxisCategories = this.state.years;
       yAxisValues = this.state.values;

       for (var i = 0; i < xAxisCategories.length; i++){
          key = xAxisCategories[i].toString();
          value = yAxisValues[i];
         data.push({x: key, y: value});
       }
    } else if (selectedIndicator === "Under Five Mortality Rate"){
      var arrDataCh = this.state.arrDataCh;
       arrDataCh.forEach(function(value,index){
         if (value.CountryName === selectedCountry){
           years.push(value.SurveyYear);
           values.push(value.Value);
         }
       });
       this.setState({years: years, values: values });

       xAxisCategories = this.state.years;
       yAxisValues = this.state.values;

       for (var j = 0; j < xAxisCategories.length; j++){
          key = xAxisCategories[j].toString();
          value = yAxisValues[j];
         data.push({x: key, y: value});
       }
    }
 }

// make the menu drop downs available again for a new query
 handleQuery(e){
  this.setState({isCountryDisabled: true, isIndicatorDisabled: false, isCharacteristicDisabled: true, selectedCountry: [], selectedIndicator: [], selectedCharacteristic: [], countries: ["Select a country"], data: [], years: [], values: [] });
 }

// function to convert div to image
saveImage(){
  var input = document.getElementById('canvas');
  html2canvas(input)
  .then((canvas) =>{
    let imgData = canvas.toDataURL('image/png').replace("image/png", "image/octet-stream");
     this.downloadURL(imgData);
  });
}

// function to enable image download to desktop
downloadURL(imgData){
  var a = document.createElement('a');
  a.href = imgData.replace("image/png", "image/octet-stream");
  a.download = 'graph.png';
  a.click();
}

// function to enable user to save data as .csv file
saveCSV(){
  var csvData = [ [this.state.selectedIndicator, this.state.selectedCountry, this.state.years],["","",this.state.values]];
  var dataString = '';
  var csvContent = "data:text/csv;charset=utf-8,";
  csvData.forEach(function(infoArray, index){
     dataString = infoArray.join(",");
     csvContent += index < infoArray.length ? dataString + "\n" : dataString;
  });
  var encodedUri = encodeURI(csvContent);
  var link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `${this.state.selectedIndicator}.csv`);
  link.click();
}

 render (){
   var date = new Date();
   var dateStr = date.toISOString().slice(0,10);

   return(
     <div>
       <NavBar />
          <div className="container-fluid">
            <div className="instructionsDiv">
              <ol className="instructions">
                 <li><strong>Please note</strong>: This data is being queried from a database based on your selections from the dropdown menus. When the data is available, the dropdown menu will become active.</li>
                 <li><strong>Select an indicator</strong> from the third dropdown.</li>
                  <li><strong>Select a country</strong> from the first dropdown.</li>
                 <li><strong>Select a category</strong> to graph from the fourth dropdown. <br/>To change to a different category, simply select a new category from the dropdown.</li>
                 <li>To perform a new query, click on the <strong>"new query"</strong> button.</li>
              </ol>
            </div>

      <select className="dropDown" onChange={(e) => this.handleIndicator(e)}  disabled={this.state.isIndicatorDisabled}>
          {
            this.state.indicators.map((ind) =>
              <option key={this.getKey()}>{ind ? ind : "Select an indicator"}</option>
            )
          }
      </select>

      <select className="dropDown" onChange={(e) => this.handleCountry(e)} disabled={this.state.isCountryDisabled}>
       {
         this.state.countries.map((country) =>
          <option key={this.getKey()}>{country ? country : "Select a country"}</option>
         )
       }
      </select>
      <select className="dropDown" onChange={(e) => this.handleCharacteristic(e)} disabled={this.state.isCharacteristicDisabled}>
      {
        this.state.characteristics.map((c) =>
          <option key={this.getKey()}>{c ? c : "Select a category"}</option>
        )
      }
    </select>
    <div>
      <button onClick={(e) => this.handleQuery(e)}>New Query</button>
    </div>

<div className="plotBox" id="canvas">
  <h6 className="plotTitle">{this.state.selectedIndicator} {this.state.selectedCountry}</h6>
    <XYPlot xType="ordinal" height={300} width={400} xDistance={10} margin={{ bottom: 150 }}>
      <XAxis tickFormat={v => `${v}`} tickLabelAngle={-70} tickPadding={20}
      style={{
        line: {stroke: '#ADDDE1'},
        ticks: {stroke: '#ADDDE1'},
        text: {stroke: 'none', fill: '#6b6b76', fontWeight: 700, fontSize: 'medium'}
      }}
      />
      <YAxis
      position="end"
      style={{fontSize: 'medium'}}
      />
      <VerticalBarSeries
        data={this.state.data}
      />
    </XYPlot>
    <p className="citationDHS">The DHS Program Indicator Data API, The Demographic and Health Surveys (DHS) Program. ICF International. Funded by the United States Agency for International Development (USAID). Available from api.dhsprogram.com. [Accessed {dateStr} ]</p>
</div>
  <button className="downloadButton" onClick={() => this.saveImage()}>Save PNG</button>
  <button className="downloadCSVButton" onClick={() => this.saveCSV()}>Save CSV</button>
</div>
</div>
   );
 }

}

export default Archives
