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
     characteristics: [], // holds characteristic groups for the selected indicator,
     selectedCharacteristic: [], // selected characteristic
     arrData: {},
     strCountry: '', // keeps track of the countryId for DHS query
     strSurveyYear: '', // keeps track of surveyId for DHS query
     strIndicator: '', // keeps track of indicatorId for DHS query,
     strCharGroup: '' // keeps track of current characteristic group to map
   }
   this.keyCount = 0;
   this.getKey = this.getKey.bind(this);
   this.handleCountry = this.handleCountry.bind(this);
   this.handleYear = this.handleYear.bind(this);
   this.handleIndicator = this.handleIndicator.bind(this);
   this.getCharacteristics = this.getCharacteristics.bind(this);
   this.handleCharacteristics = this.handleCharacteristics.bind(this);
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

// fetch survey years based on country selection
getSurveyYears(strCountry){
    var gAPIDomain = "https://api.dhsprogram.com/rest/dhs/"
    var apiURL =  gAPIDomain + "surveys/" + strCountry + "?surveyType=DHS";
    axios.get(apiURL)
    .then(response => {
      console.log("survey Years");
      console.log(response.data.Data[0]);
      this.setState({
        years: response.data.Data
      });
    });
}
// handle survey year selection
handleYear(e){
   this.setState({ selectedYear: e.target.value });
   var selectedYear = e.target.value;
   console.log("selectedYear", selectedYear);
   if(this.state.years.length === 1){
     var strSurveyYear = this.state.years.surveyYear.SurveyId;
   } else {

     var result = this.state.years.filter((yr) =>
       yr.SurveyYear.toString() === selectedYear
    );
    console.log("result", result);
      strSurveyYear = result[0].SurveyId;
   }
   console.log("strSurveyYear", strSurveyYear);
   this.setState({ strSurveyYear: strSurveyYear });
   this.getIndicators(this.state.strCountry,strSurveyYear);
}

// fetch the indicator data based on country and year selection
 async getIndicators(strCountry, strSurveyYear){
   // Create URL to obtain indicators. Specify 1000 rows to get maximum results.
   var gAPIDomain = "https://api.dhsprogram.com/rest/dhs/"
   var apiURL = gAPIDomain + "indicators?countryIds=" + strCountry + "&surveyIds=" + strSurveyYear + "&perpage=1000&f=json";
   axios.get(apiURL)
   .then(response => {
     console.log("Indicators");
     console.log(response.data.Data[0]);
     this.setState({
       indicators: response.data.Data
     });
   });
 }

// store the selected indicator from dropdown menu in state
 handleIndicator(e){
   var selectedIndicator = e.target.value;
   console.log("selectedIndicator",selectedIndicator);
   console.log("this.state.indicators",this.state.indicators[0]);
   var result = this.state.indicators.filter((co) =>
    co.Label.toString() === selectedIndicator
   );
   console.log("results indicators",result);
   var strIndicator = result[0].IndicatorId;
   this.setState({IndicatorId: e.target.value});
   this.getCharacteristics(this.state.strCountry,this.state.strSurveyYear,strIndicator);
 }

// build the query based on user's selection to obtain the data
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
      var unformattedData = response.data.Data;
      console.log("arrData", response.data.Data);
   // format the characteristic labels for charting
     unformattedData.forEach(function(value, index) {
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
    var listCharGroups = Object.keys(arrData);
    this.setState({arrData: unformattedData, characteristics: listCharGroups});
 });

}

handleCharacteristics(e){
 this.setState({selectedCharacteristic: e.target.value});
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
           <option key={this.getKey()}>{country.CountryName}</option>
          )
       }
     );
       </select>
       <p className="searchTitles">Survey Years: </p>
      <select className="dropDown" onChange={(e) => this.handleYear(e)}>
         {
            this.state.years.map((year) =>
              <option key={this.getKey()}>{year.SurveyYear}</option>
            )
         }
      </select>
      <p className="searchTitles">Indicators: </p>
      <select className="dropDown" onChange={(e) => this.handleIndicator(e)}>
        {
          this.state.indicators.map((ind) =>
            <option key={this.getKey()}>{ind.Label}</option>
          )
        }
      </select>
      <p className="searchTitles">Characteristics: </p>
      <select className="dropDown" onChange={(e) => this.handleCharacteristics(e)}>>
      {
        this.state.characteristics.map((c) =>
          <option key={this.getKey()}>{c}</option>
        )
      }
      </select>

      <button>
        Graph
      </button>

       </div>
    );
  }

}





export default Search
