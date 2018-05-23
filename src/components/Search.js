import React, { Component } from 'react';
import './Search.css';

// import Highcharts from 'highcharts';

var axios = require('axios');

class Search extends Component {

  constructor(props) {
   super(props)
   this.state = {
     countries: [], //  countries to populate dropdown menu
     years: [], // suvey years to populate dropdown menu
     indicators: [], // indicators to populate dropdown menu
     selectedCountry: [], // current country selected from dropdown
     selectedYear: [], // current year selected from dropdown
     selectedIndicator: [], //current indicator selected from dropdown,
     arrData: {}, // holds selected query results
     characteristics: [], // holds characteristic groups for the selected indicator,
     selectedCharacteristic: [] // selected characteristic
   }
   this.keyCount = 0;
   this.getKey = this.getKey.bind(this);
 }

// when the program loads, make the API call to get data to populate dropdown menu
 componentDidMount() {
  this.getCountries();
  this.getSurveyYears();
  this.getIndicators();
 }

 getKey(){
    return this.keyCount++;
}

// query rails API for countries
 async getCountries(){
   var axiosInstance = axios.create({
     baseURL: 'http://localhost:3001/api/v1'
   })
   try {
    let response = await axiosInstance.get('/countries')
    console.log("countries", response.data[0]);
    this.setState({
      countries: response.data
    })
  } catch(err){
    console.log(err);
  }
 }

 async getSurveyYears(){
   var axiosInstance = axios.create({
     baseURL: 'http://localhost:3001/api/v1'
   })
   try {
    let response = await axiosInstance.get('/surveys')
    console.log("surveyYears", response.data[0]);
    this.setState({
      years: response.data
    })
  } catch(err){
    console.log(err);
  }
 }

 async getIndicators(){
   var axiosInstance = axios.create({
     baseURL: 'http://localhost:3001/api/v1'
   })
   try {
    let response = await axiosInstance.get('/indicators')
    console.log("indicators", response.data[0]);
    this.setState({
      indicators: response.data
    })
  } catch(err){
    console.log(err);
  }
 }

// store the selected country from dropdown menu in state
 handleCountry(e){
   console.log(e.target.value);
   this.setState({selectedCountry: e.target.value});
 }

// store the selected year from dropdown menu in state
 handleYear(e){
   console.log(e.target.value);
   this.setState({selectedYear: e.target.value});
 }
// store the selected indicator from dropdown menu in state
 handleIndicator(e){
   console.log(e.target.value);
   this.setState({selectedIndicator: e.target.value});
   this.populateCharacteristics();
 }

 handleCharacteristics(e){
  console.log(e.target.value);
  this.setState({selectedCharacteristic: e.target.value});
}

// build the query based on user's selection to obtain the data
 async getGraphData(){
   var strCountry = this.state.selectedCountry;
   var strSurveyYear = this.state.selectedYear;
   var strIndicator = this.state.selectedIndicator;
   //Create URL to obtain data.
  var baseURL = 'https://api.dhsprogram.com/rest/dhs/';
   var axiosInstance = axios.create({
     baseURL: 'https://api.dhsprogram.com/rest/dhs/'
   })
   try {
     var apiURL = baseURL +
                     "data?countryIds=" + strCountry +
                     "&surveyIds=" + strSurveyYear +
                     "&indicatorIds=" + strIndicator +
                     "&f=json&perpage=100&breakdown=all";
    console.log("apiURL",apiURL);
    let response = await axiosInstance.get(apiURL)
   //Obtain data.
   .then(response => {
     console.log("Graph Data");
     console.log(response.data.Data[0])
     this.setState({
       arrData: response.data.Data
     });
   })
     } catch(err){
    console.log(err);
    }
 }

// populate the characteristic groups
// need to refactor so this does not get called until after indicator is selected...
 getCharacteristicGroups(){
   var arrData = this.state.arrData;
   [arrData].forEach(function(value) {
     if(!arrData[value.CharacteristicCategory]){
        arrData[value.CharacteristicCategory] = {};
        arrData[value.CharacteristicCategory][value.CharacteristicLabel] = {};
        arrData[value.CharacteristicCategory][value.CharacteristicLabel][value.ByVariableLabel] = value.Value;
     } else if(!arrData[value.CharacteristicCategory][value.CharacteristicLabel]){
       arrData[value.CharacteristicCategory][value.CharacteristicLabel] = {};
       arrData[value.CharacteristicCategory][value.CharacteristicLabel][value.ByVariableLabel] = value.Value;
     }else if(!arrData[value.CharacteristicCategory][value.CharacteristicLabel][value.ByVariableLabel]){
         if(value.ByVariableLabel.length > 0){
           arrData[value.CharacteristicCategory][value.CharacteristicLabel][value.ByVariableLabel] = value.Value; }
       } else {
         if(value.ByVariableLabel.length > 0){
         arrData[value.CharacteristicCategory][value.CharacteristicLabel][value.ByVariableLabel] = value.Value; }
       }

   });
  // populate the characteristics menu from the selected indicator
    var listCharGroups = Object.keys(arrData);
    this.setState({characteristics: listCharGroups});
    this.populateCharacteristics();
}

populateCharacteristics(){
  let characteristics = this.state.characteristics;
  let charItems = characteristics.map((char) =>
    <option key={this.getKey()}>{char}</option>
 );
}

  render(){
    let countries = this.state.countries;
    let countryItems = countries.map((country) =>
      <option key={this.getKey()}>{country.CountryName}</option>
  );

    let years = this.state.years;
    let yearItems = years.map((year) =>
      <option key={this.getKey()}>{year.SurveyYearLabel}</option>
  );

    let indicators = this.state.indicators;
    let indicatorItems = indicators.map((ind) =>
      <option key={ind.IndicatorId}>{ind.Label}</option>
  );

    return (
   <div className="container-fluid">
       <p className="searchTitles">Countries: </p>
       <select className="dropDown" onChange={(e) => this.handleCountry(e)}>
          {countryItems}
       </select>
       <p className="searchTitles">Survey Years: </p>
       <select className="dropDown" onChange={(e) => this.handleYear(e)}>
          {yearItems}
       </select>
       <p className="searchTitles">Indicators: </p>
       <select className="dropDown" onChange={(e) => this.handleIndicator(e)}>
          {indicatorItems}
       </select>
       <p className="searchTitles">Characteristics: </p>

       <div>
         <button className="graphButton" onClick={this.getGraphData()}>
           Graph
         </button>
       </div>
       </div>
    );
  }



}





export default Search
