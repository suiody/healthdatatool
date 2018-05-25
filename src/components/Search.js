import React, { Component } from 'react';
import './Search.css';
import axios from 'axios';
import './react_plot_style.css';
import {XYPlot, XAxis, YAxis,VerticalBarSeries} from 'react-vis';

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
     characteristics: [], // holds characteristic groups for the selected indicator,
     selectedCharacteristic: [], // selected characteristic
     arrData: {}, // stores formatted characterstics/values for graphing
     strCountry: '', // keeps track of the countryId for DHS query
     strSurveyYear: '', // keeps track of surveyId for DHS query
     strIndicator: '', // keeps track of indicatorId for DHS query
     strCharGroup: '', // keeps track of current characteristic group to map
     data: [] // data values for graphing
   }
   this.keyCount = 0;
   this.valueCount = 0;
   this.getKey = this.getKey.bind(this);
   this.getCountries = this.getCountries.bind(this);
   this.handleCountry = this.handleCountry.bind(this);
   this.getSurveyYears = this.getSurveyYears.bind(this);
   this.handleYear = this.handleYear.bind(this);
   this.getIndicators = this.getIndicators.bind(this);
   this.handleIndicator = this.handleIndicator.bind(this);
   this.getCharacteristics = this.getCharacteristics.bind(this);
   this.handleCharacteristic = this.handleCharacteristic.bind(this);
 }

// when the program loads, make the API call to get data to populate dropdown menu
  componentDidMount() {
    this.getCountries(); // load countries first, other menus are dependent on country selection
  }

// getKey and getValue are for providing unique key/values; there are sometimes overlapping values within the datasets
  getKey(){
    return this.keyCount++;
  }

  getValue(){
   return this.valueCount++;
  }

// query DHS API for countries
 async getCountries(){
   var axiosInstance = axios.create({
     baseURL: 'https://api.dhsprogram.com/rest/dhs'
   })
   try {
    let response = await axiosInstance.get('/countries')
    this.setState({
      countries: response.data.Data
    })
  } catch(err){
    console.log(err);
  }
 }
 // store the selected country from dropdown menu in state
  handleCountry(e){
    var selectedCountry = e.target.value;
    this.state.countries.shift(); // get rid of the placeholder element
    var result = this.state.countries.filter((co) =>
      co.CountryName === selectedCountry
   );
    var strCountry = result[0].DHS_CountryCode.toString();
    this.setState({ strCountry: strCountry, selectedCountry: selectedCountry });
    this.getSurveyYears(strCountry);
   }

// query DHS API survey years based on country selection
getSurveyYears(strCountry){
    var gAPIDomain = "https://api.dhsprogram.com/rest/dhs/"
    var apiURL =  gAPIDomain + "surveys/" + strCountry + "?surveyType=DHS";
    axios.get(apiURL)
    .then(response => {
      this.setState({
        years: response.data.Data
      });
    });
}
// handle survey year selection; extract surveyId and store selectedYear in state
handleYear(e){
   var selectedYear = e.target.value;
   this.setState({ selectedYear: selectedYear });
   this.state.years.shift(); // get rid of the placeholder element
   var result = this.state.years.filter((yr) =>
     yr.SurveyYear.toString() === selectedYear
   );
   var strSurveyYear = result[0].SurveyId;
   this.setState({ strSurveyYear: strSurveyYear });
   this.getIndicators(this.state.strCountry,strSurveyYear);
}

// fetch the indicator data based on country and year selection from DHS API
 async getIndicators(strCountry, strSurveyYear){
   // Create URL to obtain indicators. Specify 1000 rows to get maximum results.
   var gAPIDomain = "https://api.dhsprogram.com/rest/dhs/"
   var apiURL = gAPIDomain + "indicators?countryIds=" + strCountry + "&surveyIds=" + strSurveyYear + "&perpage=1000&f=json";
   axios.get(apiURL)
   .then(response => {
     this.setState({
       indicators: response.data.Data
     });
   });
 }

// store the selected indicator in state
 handleIndicator(e){
   var selectedIndicator = e.target.value;
   this.state.indicators.shift(); // remove placeholder element
   var result = this.state.indicators.filter((co) =>
    co.Label.toString() === selectedIndicator
   );
   var strIndicator = result[0].IndicatorId;
   this.setState({IndicatorId: e.target.value});
   this.getCharacteristics(this.state.strCountry,this.state.strSurveyYear,strIndicator);
 }

// build the query based on user's selection to obtain the data from DHS API
 async getCharacteristics(strCountry,strSurveyYear,strIndicator){
   var gAPIDomain = "https://api.dhsprogram.com/rest/dhs/";
   //Create URL to obtain data.
   var apiURL = gAPIDomain + "data?countryIds=" + strCountry +
                     "&surveyIds=" + strSurveyYear +
                     "&indicatorIds=" + strIndicator +
                     "&f=json&perpage=1000&breakdown=all";
    console.log("apiURL", apiURL);
    axios.get(apiURL)
    .then(response => {
      var arrData = {};
      var inputData = response.data.Data;
   // format the characteristic labels for charting
     inputData.forEach(function(value, index) {
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
      this.setState({arrData: arrData});
      console.log("arrData", arrData);
      // populate the data characteristics drop down menu
      var listCharGroups = Object.keys(arrData);
        this.setState({characteristics: listCharGroups});
    });
  }

// store selected characterstic in state
handleCharacteristic(e){
  var selectedCharacteristic = e.target.value;
  this.state.characteristics.shift();
  this.setState({selectedCharacteristic: selectedCharacteristic});
  var strCharGroup = selectedCharacteristic;
  this.graphData(strCharGroup);
}

graphData(strCharGroup){
  var xAxisCategories = [];
  var arrSeriesNames = [];
  var arrSeriesValues = [];
  var arrData = this.state.arrData;
  xAxisCategories = Object.keys(arrData[strCharGroup]);
  arrSeriesNames = Object.values(arrData[strCharGroup]);
  arrSeriesNames.forEach(function(series){
     arrSeriesValues.push(Object.values(series));
  });
  var data = [];
  var yAxisValues = [].concat.apply([], arrSeriesValues);

  for (var i = 0; i < xAxisCategories.length; i++){
    var hash = {};
    var key = xAxisCategories[i].toString();
    var value = yAxisValues[i];
    var x, y;
    data.push({x: key, y: value});
  }
  console.log("data", data);
 this.setState({data: data});
}
  render(){
    //add a placeholder for dropdown for first menu item
    // within render, placeholder gets filled with a message.
    let tmpCountries = this.state.countries;
    let countries = tmpCountries.unshift("0");

    let tmpYears = this.state.years;
    let years = tmpYears.unshift("0");

    let tmpIndicators = this.state.indicators;
    let indicators = tmpIndicators.unshift("0");

    let tmpCharacteristics = this.state.characteristics;
    let characteristics = tmpCharacteristics.unshift("0");

    return (
   <div className="container-fluid">
       <p className="searchTitles">Countries:</p>
       <select className="dropDown" onChange={(e) => this.handleCountry(e)}>
        {
          this.state.countries.map((country) =>
           <option key={this.getKey()}>{country.CountryName ? country.CountryName : "Select a country"}</option>
          )
       }
     );
       </select>

       <p className="searchTitles">Survey Years:</p>
      <select className="dropDown" onChange={(e) => this.handleYear(e)}>
         {
            this.state.years.map((year) =>
              <option key={this.getKey()}>{year.SurveyYear ? year.SurveyYear : "Select a year"}</option>
            )
         }
      </select>
      <p className="searchTitles">Indicators:</p>
      <select className="dropDown" onChange={(e) => this.handleIndicator(e)}>
        {
          this.state.indicators.map((ind) =>
            <option key={this.getKey()}>{ind.Label ? ind.Label : "Select an indicator"}</option>
          )
        }
      </select>
      <p className="searchTitles">Characteristics: </p>
      <select className="dropDown" onChange={(e) => this.handleCharacteristic(e)}>>
      {
        this.state.characteristics.map((c) =>
          <option key={this.getKey()}>{c === "0" ? "Select a category": c}</option>
        )
      }
      </select>

    <XYPlot xType="ordinal" height={200} width={400}>
      <XAxis
        attr="x"
        attrAxis="y"
        orientation="bottom"
      />
      <YAxis
        attr="y"
        attrAxis="x"
        orientation="left"
      />
      <VerticalBarSeries
        data={this.state.data}
        style={{}}
      />
  </XYPlot>

       </div>
    );
  }

}





export default Search
