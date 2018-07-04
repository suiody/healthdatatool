import React, { Component } from 'react';
import './DHS.css';
import axios from 'axios';
import NavBar from './NavBar';
import './react_plot_style.css';
import {XYPlot,XAxis, YAxis,VerticalBarSeries} from 'react-vis';
import html2canvas from 'html2canvas';


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
     xvalues: [], // stores x-axis values for csv
     yvalues: [], // stores y-axis values for csv
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
     window.alert("There was a problem accessing the DHS database. Please try again later or search the archived data under the archives tab.");
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
      window.alert("The was a problem accessing the DHS database. Please try back later or search the archived data under the archives tab.");
     window.location = "/";
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

// prep data for plotting
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
    var key = xAxisCategories[i].toString();
    var value = yAxisValues[i];
    data.push({x: key, y: value, xOffset: 5, rotation: 34});
  }
  this.setState({data: data, yvalues: yAxisValues, xvalues: xAxisCategories});
}

removeA(arr) {
    var what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax= arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
}
 // make the menu drop downs available again for a new query
handleQuery(e){
 var tmp = this.state.countries;
 // remove multiple instances incase user goes back and forth with selection
 this.removeA(tmp,"Select a country");
 //make sure only appears once, note: refactor later, quick bug fix
 tmp.unshift("Select a country");

 this.setState({ isCountryDisabled: false, isYearDisabled: true, isIndicatorDisabled: true, isCharacteristicDisabled: true, selectedCountry: [], selectedYear: [], selectedIndicator: [], selectedCharacteristic: [], countries: tmp, years: ["Select a year"], indicators: ["Select an indicator"], characteristics: ["Select a category"], data: [], xvalues: [], yvalues: [] });
}

// function to convert plot canvas to image
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

// function to enable user to save data as .csv file
saveCSV(){
  var csvData = [ [this.state.selectedIndicator, this.state.selectedCountry, this.state.selectedYear, this.state.xvalues],["","","",this.state.yvalues]];
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

  render(){
    var date = new Date();
    var dateStr = date.toISOString().slice(0,10);

    return (
<div>
  <NavBar />
     <div className="container-fluid">
       <div className="instructionsDiv">
         <ol className="instructions">
            <li><strong>Please note</strong>: This data is being queried from the DHS database based on your selections from the dropdown menus. When the data is available, the dropdown menu will become active. There are over 2,900 indicators so please be patient while the indicator dropdown loads.</li>
            <li><strong>Select a country</strong> from the first dropdown.</li>
            <li><strong>Select a survey year</strong> from the second dropdown.</li>
            <li><strong>Select an indicator</strong> from the third dropdown.</li>
            <li><strong>Select a category</strong> to graph from the fourth dropdown. <br/>To change to a different category, simply select a new category from the dropdown.</li>
            <li>To perform a new query, click on the <strong>"new query"</strong> button.</li>
         </ol>
        </div>

         <select className="dropDown" onChange={(e) => this.handleCountry(e)} disabled={this.state.isCountryDisabled}>
          {
            this.state.countries.map((country) =>
             <option key={this.getKey()}>{country.CountryName ? country.CountryName : "Select a country"}</option>
            )
          }
         </select>
          <select className="dropDown" onChange={(e) => this.handleYear(e)} disabled={this.state.isYearDisabled}>
             {
                this.state.years.map((year) =>
                  <option key={this.getKey()}>{year.SurveyYear ? year.SurveyYear : "Select a year"}</option>
                )
             }
        </select>
        <select className="dropDown" onChange={(e) => this.handleIndicator(e)}   disabled={this.state.isIndicatorDisabled}>
            {
              this.state.indicators.map((ind) =>
                <option key={this.getKey()}>{ind.Label ? ind.Label : "Select an indicator"}</option>
              )
            }
        </select>
          <select className="dropDown" onChange={(e) => this.handleCharacteristic(e)}  disabled={this.state.isCharacteristicDisabled}>
          {
            this.state.characteristics.map((c) =>
              <option key={this.getKey()}>{this.state.characteristics ? c : "Select a category"}</option>
            )
          }
        </select>
        <div>
          <button onClick={(e) => this.handleQuery(e)}>New Query</button>
        </div>

      <div className="plotBox" id="canvas">
      <p className="plotTitle">{this.state.selectedCountry} {this.state.selectedYear} {this.state.selectedIndicator}</p>
        <XYPlot xType="ordinal" height={400} width={500} margin={{bottom: 200, left: 60}}>
          <XAxis tickFormat={v => `${v}`} tickPadding={20} tickLabelAngle={-60}
          style={{ fontSize: 'small'}}
          />
          <YAxis
          style={{fontSize: 'small'}} tickPadding={20}
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





export default DHS
