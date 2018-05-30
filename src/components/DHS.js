import React, { Component } from 'react';
import './DHS.css';
import axios from 'axios';
import NavBar from './NavBar';
import './react_plot_style.css';
import {XYPlot,XAxis, YAxis,VerticalBarSeries} from 'react-vis';


class DHS extends Component {

  constructor(props) {
   super(props)
   this.state = {
     countries: ["Select a country"], //  countries to populate dropdown menu
     years: ["Select a year"], // suvey years to populate dropdown menu
     indicators: ["Select an indicator"], // indicators to populate dropdown menu
     selectedCountry: [], // current country selected from dropdown
     selectedYear: [], // current year selected from dropdown
     selectedIndicator: [], //current indicator selected from dropdown,
     characteristics: ["Select a category"], // holds characteristic groups for the selected indicator,
     selectedCharacteristic: [], // selected characteristic
     listCharGroups: ["Select a category"],
     arrData: {}, // stores formatted characterstics/values for graphing
     strCountry: '', // keeps track of the countryId for DHS query
     strSurveyYear: '', // keeps track of surveyId for DHS query
     strIndicator: '', // keeps track of indicatorId for DHS query
     strCharGroup: '', // keeps track of current characteristic group to map
     data: [], // data values for graphing
     isCountryDisabled: false, // by default, only make country dropdown visible
     isYearDisabled: true, // will be enabled after country selection or new query
     isIndicatorDisabled: true, // will be enabled after year selection or new query
     isCharacteristicDisabled: true // will be enabled after indicator selection
   }
   this.keyCount = 0;
   this.valueCount = 0;
   this.getKey = this.getKey.bind(this);
   this.getValue = this.getValue.bind(this);
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
    if(response.status === 200){
      this.setState({
        countries: this.state.countries.concat(response.data.Data)
      })
    }
  } catch(err){
    console.log(err);
    window.alert("There was a problem accessing the DHS database. Please try again later or search the archived data under the archives tab");
    window.location = "/";
    return
  }
 }
 // store the selected country from dropdown menu in state
  handleCountry(e){
    var selectedCountry = e.target.value;
    console.log("countries array",this.state.countries);
    var result = this.state.countries.filter((co) =>
      co.CountryName === selectedCountry
   );
    var strCountry = result[0].DHS_CountryCode.toString();
    this.setState({ strCountry: strCountry, selectedCountry: selectedCountry });
    this.setState({ isCountryDisabled: true});
    this.getSurveyYears(strCountry);
   }

// query DHS API survey years based on country selection
async getSurveyYears(strCountry){
    var gAPIDomain = "https://api.dhsprogram.com/rest/dhs/"
    var apiURL =  gAPIDomain + "surveys/" + strCountry + "?surveyType=DHS";
    var axiosInstance = axios.create({
    baseURL: 'https://api.dhsprogram.com/rest/dhs/'
    })
    try {
    let response = await axiosInstance.get(apiURL)
      if(response.status === 200){
      this.setState({
        years: this.state.years.concat(response.data.Data)
      })
     }
    } catch(err){
     console.log(err);
     window.alert("There was a problem accessing the DHS database. Please try again later or search the archived data under the archives tab");
     window.location = "/";
     return
    }
    this.setState({ isYearDisabled: false });
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
   this.setState({ isYearDisabled: true });
   this.getIndicators(this.state.strCountry,strSurveyYear);
}

// fetch the indicator data based on country and year selection from DHS API
 async getIndicators(strCountry, strSurveyYear){
   // Create URL to obtain indicators. Specify 1000 rows to get maximum results.
   var gAPIDomain = "https://api.dhsprogram.com/rest/dhs/"
   var apiURL = gAPIDomain + "indicators?countryIds=" + strCountry + "&surveyIds=" + strSurveyYear + "&perpage=1000&f=json";
   var axiosInstance = axios.create({
    baseURL: 'https://api.dhsprogram.com/rest/dhs/'
   })
   try {
   let response = await axiosInstance.get(apiURL)
     if(response.status === 200){
     this.setState({
       indicators: this.state.indicators.concat(response.data.Data)
     })
   }
   } catch(err){
     console.log(err);
     return window.alert("The was a problem accessing the DHS database. Please try back later or search the archived data under the archives tab");
     window.location = "/";
     return
   }
   this.setState({ isIndicatorDisabled: false });
 }

// store the selected indicator in state
 handleIndicator(e){
   var selectedIndicator = e.target.value;
   this.state.indicators.shift(); // remove placeholder element
   var result = this.state.indicators.filter((co) =>
    co.Label.toString() === selectedIndicator
   );
   var strIndicator = result[0].IndicatorId;
   this.setState({selectedIndicator: selectedIndicator});
   this.setState({IndicatorId: e.target.value});
   this.setState({ isIndicatorDisabled: true });
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
      if(response.status === 200){
      var arrData = {};
      var inputData = response.data.Data;
    } else {
      return window.alert("The was a problem accessing the DHS database. Please try back later or search the archived data under the archives tab");
    }
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
      this.setState({ arrData: arrData });
      console.log("arrData", arrData);
      // populate the data characteristics drop down menu
      var listCharGroups = this.state.listCharGroups.concat(Object.keys(arrData));
        this.setState({ characteristics: listCharGroups, isCharacteristicDisabled: false});
      });
  }

// store selected characterstic in state
handleCharacteristic(e){
  var selectedCharacteristic = e.target.value;
  this.setState({selectedCharacteristic: selectedCharacteristic});
  var strCharGroup = selectedCharacteristic;
  this.graphData(strCharGroup);
}

graphData(strCharGroup){
  var xAxisCategories = [];
  var arrSeriesNames = [];
  var arrSeriesValues = [];
  var arrData = this.state.arrData;
    if (arrData[strCharGroup]){
    xAxisCategories = Object.keys(arrData[strCharGroup]);
    arrSeriesNames = Object.values(arrData[strCharGroup]);
    arrSeriesNames.forEach(function(series){
       arrSeriesValues.push(Object.values(series));
    });
  }
  var data = [];
  var yAxisValues = [].concat.apply([], arrSeriesValues);

  for (var i = 0; i < xAxisCategories.length; i++){
    var hash = {};
    var key = xAxisCategories[i].toString();
    var value = yAxisValues[i];
    var x, y;
    data.push({x: key, y: value, xOffset: 5, rotation: 34});
  }
  console.log("data", data);
  this.setState({data: data});
}

handleQuery(e){
 // make the menu drop downs available again for a new query
 this.setState({isCountryDisabled: false, isYearDisabled: true, isIndicatorDisabled: true, isCharacteristicDisabled: true, selectedCountry: [], selectedYear: [], selectedIndicator: [], selectedCharacteristic: [] });
}

  render(){

    const axisStyle = {
      ticks: {
        fontSize: '12px',
        color: '#333'
      },
      title: {
        fontSize: '16px',
        color: '#333',
        fontWeight: 'bold',
        position: 'middle'
      }
    };

    return (
<div>
  <NavBar />
     <div className="container-fluid">
       <div className="instructionsDiv">
         <ol className="instructions">
            <li><strong>Please note</strong>: This data is being queried from the DHS database based on your selections from the dropdown menus. When the data is available, the dropdown menu will become active.</li>
            <li><strong>Select a country</strong> from the first dropdown.</li>
            <li><strong>Select a survey year</strong> from the second dropdown.</li>
            <li><strong>Select an indicator</strong> from the third dropdown.</li>
            <li><strong>Select a category</strong> to graph from the forth dropdown. <br/>To change to a different category, simply select a new category from the dropdown.</li>
            <li>To perform a new query, click on the <strong>"new query"</strong> button.</li>
         </ol>
        </div>

         <select className="dropDown" onChange={(e) => this.handleCountry(e)} value={this.state.selectedCountry} disabled={this.state.isCountryDisabled}>
          {
            this.state.countries.map((country) =>
             <option key={this.getKey()}>{country.CountryName ? country.CountryName : "Select a country"}</option>
            )
          }
         </select>
          <select className="dropDown" onChange={(e) => this.handleYear(e)} value={this.state.selectedYear} disabled={this.state.isYearDisabled}>
             {
                this.state.years.map((year) =>
                  <option key={this.getKey()}>{year.SurveyYear ? year.SurveyYear : "Select a year"}</option>
                )
             }
        </select>
        <select className="dropDown" onChange={(e) => this.handleIndicator(e)}     value={this.state.selectedIndicator} disabled={this.state.isIndicatorDisabled}>
            {
              this.state.indicators.map((ind) =>
                <option key={this.getKey()}>{ind.Label ? ind.Label : "Select an indicator"}</option>
              )
            }
        </select>
          <select className="dropDown" onChange={(e) => this.handleCharacteristic(e)} value={this.state.selectedCharacteristic} disabled={this.state.isCharacteristicDisabled}>
          {
            this.state.characteristics.map((c) =>
              <option key={this.getKey()}>{this.state.characteristics ? c : "Select a category"}</option>
            )
          }
        </select>
        <div>
          <button onClick={(e) => this.handleQuery(e)}>New Query</button>
        </div>

        <XYPlot xType="ordinal" height={300} width={400} margin={{bottom: 100}}>
          <XAxis tickFormat={v => `${v}`} tickLabelAngle={-70}
          style={{
            line: {stroke: '#ADDDE1'},
            ticks: {stroke: '#ADDDE1'},
            text: {stroke: 'none', fill: '#6b6b76', fontWeight: 700}
          }}
          />
          <YAxis />
          <VerticalBarSeries
            data={this.state.data}
          />
        </XYPlot>

    </div>
  </div>
      );
    }

}





export default DHS
