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
     selectedCharacteristic: [], // selected characteristic
     strCountry: '', // keeps track of the countryId for DHS query
     strSurveyYear: '', // keeps track of surveyId for DHS query
     strIndicator: '', // keeps track of indicatorId for DHS query,
     strCharGroup: '' // keeps track of current characteristic group to map
   }
   this.keyCount = 0;
   this.getKey = this.getKey.bind(this);
 }

// when the program loads, make the API call to get data to populate dropdown menu
 componentDidMount() {
  this.getCountries();
 }

 getKey(){
  return this.keyCount++;
}

// query rails API for countries
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
    this.setState({ selectedCountry: e.target.value });
    var selectedCountry = e.target.value;
    var result = this.state.countries.filter((co) =>
      co.CountryName === selectedCountry
   );
    var strCountry = result[0].DHS_CountryCode.toString();
    this.setState({ strCountry: strCountry })
    this.getSurveyYears(strCountry);
   }

// need to refactor considering cases where there is only one survey year, doesn't work yet...
handleYear(e){
   this.setState({ selectedYear: e.target.value });
   var selectedYear = e.target.value;
   if (selectedYear.length == 1) {
    selectedYear = e.target.value[0];
   } else {
     selectedYear = e.target.value;
   }

   var result = this.state.years.filter((yr) =>
     yr.SurveyYearLabel === selectedYear
  );
  // need to refactor...grab value
   var strSurveyYear = result[0].SurveyYearLabel;
   this.setState({ strSurveyYear: strSurveyYear })
   this.getIndicators(this.state.strCountry, this.state.strSurveyYear);
}
getSurveyYears(strCountry){
    var gAPIDomain = "https://api.dhsprogram.com/rest/dhs/"
    var apiURL =  gAPIDomain + "surveys/" + strCountry + "?surveyType=DHS";
    axios.get(apiURL)
    .then(response => {
      console.log("survey Years");
      console.log(response.data.Data[0])
      this.setState({
        years: response.data.Data
      });
    });
}

// refactor this
 async getIndicators(strCountry, strSurveyYear){
   var gAPIDomain = "https://api.dhsprogram.com/rest/dhs"
   var strCountry = this.state.selectedCountry;
   var strSurveyYear = this.state.selectedYear;
   //Create URL to obtain data.
   var apiURL = gAPIDomain +
                   "data?countryIds=" + strCountry +
                   "&surveyIds=" + strSurveyYear +
                   "&indicatorIds=" +
                   "&f=json&perpage=1000&breakdown=all";
   var axiosInstance = axios.create({
     baseURL: 'https://api.dhsprogram.com/rest/dhs/'
   })
   try {
    let response = await axiosInstance.get('/indicators')
    this.setState({
      indicators: response.data.Data
    })
  } catch(err){
    console.log(err);
  }
 }

// store the selected indicator from dropdown menu in state
 handleIndicator(e){
   this.setState({IndicatorId: e.target.value});
 }


 handleCharacteristics(e){
  this.setState({selectedCharacteristic: e.target.value});
}

// build the query based on user's selection to obtain the data
 async getGraphData(e){
   var strCountry = this.state.CountryId;
   var strSurveyYear = this.state.SurveyId;
   var strIndicator = this.state.IndicatorId;
   //Create URL to obtain data.
   var baseURL = 'https://api.dhsprogram.com/rest/dhs/';
   var axiosInstance = axios.create({
     baseURL: 'https://api.dhsprogram.com/rest/dhs/'
   })
   try {
     var apiURL = baseURL + "data?countryIds=" + strCountry +
                     "&surveyIds=" + strSurveyYear +
                     "&indicatorIds=" + strIndicator +
                     "&f=json&perpage=1000&breakdown=all";
    console.log("apiURL", apiURL);
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
}

  render(){
    let countries = this.state.countries;
    let years = this.state.years;
    let indicators = this.state.indicators;
    let characteristics = this.state.characteristics;

    return (
   <div className="container-fluid">
       <p className="searchTitles">Countries: </p>
       <select className="dropDown" onChange={(e) => this.handleCountry(e)}>
        {
          this.state.countries.map((country) =>
           <option key={country.CountryId}>{country.CountryName}</option>
          )
       }
     );
       </select>
       <p className="searchTitles">Survey Years: </p>
      <select className="dropDown" onChange={(e) => this.handleYear(e)}>
         {
            this.state.years.map((year) =>
              <option key={year.SurveyId}>{year.SurveyYearLabel}</option>
            )
         }
      </select>
      <p className="searchTitles">Indicators: </p>
      <select className="dropDown" onChange={(e) => this.handleIndicator(e)}>
        {
          this.state.indicators.map((ind) =>
            <option key={ind.IndicatorId}>{ind.Label}</option>
          )
        }
      </select>
      <p className="searchTitles">Characteristics: </p>

       </div>
    );
  }



}





export default Search
