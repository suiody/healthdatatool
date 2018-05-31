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
    baseURL: 'http://localhost:3001/api/v2'
  })
  try {
   let response = await axiosInstance.get('/infant_mortalities.json')
   if(response.status === 200){
     var infantData = this.state.infantData;
     infantData = response.data;
     console.log("infant data", response.data[0]);
     this.setState({
       infantData: response.data
     })
   }
 } catch(err){
   console.log(err);
   window.alert("There was a problem connecting to the archives. Please try again later, or search one of the other databases.");
   window.location = "/";
   return
 }
 this.getChildMortality();
}

async getChildMortality(){
  var axiosInstance = axios.create({
    baseURL: 'http://localhost:3001/api/v2'
  })
  try {
   let response = await axiosInstance.get('/under_five_mortalities.json')
   if(response.status === 200){
     var childData = this.state.childData;
     childData = response.data;
     console.log("child data", response.data[0]);
     this.setState({
       childData: response.data
     })
   }
 } catch(err){
   console.log(err);
   window.alert("There was a problem connecting to the archives. Please try again later, or search one of the other databases.")
   window.location = "/";
   return
 }
}

// extrapolate the relevant data from the datasets returned in the API call
populateData(strIndicator){
  var selectedIndicator = strIndicator;

  if (selectedIndicator === "Infant Mortality Rate"){
      var infantData = this.state.infantData;
        if (infantData) {
          var arrDataInf = this.state.arrDataInf;
          infantData.forEach(function(value,index){
            var hash = {};
              hash["CountryName"] = value.CountryName;
              hash["SurveyYear"] = value.SurveyYear;
              hash["Indicator"] = value.Indicator;
              hash["CharacteristicLabel"] = value.CharacteristicLabel;
              hash["Value"] = value.Value;
              arrDataInf.push(hash);
          });
          // array to hold country values, contains duplicates
          var tmp = [];
           arrDataInf.forEach(function(value,index){
             tmp.push(value.CountryName);
           });
           // some countries are listed multiple times because they have multiple survey years
          var uniqCountries = Array.from(new Set(tmp))
          this.setState({ countries: this.state.countries.concat(uniqCountries) });
         }
  } else if(selectedIndicator === "Under Five Mortality Rate"){
    var childData = this.state.childData;
      if (childData) {
        var arrDataCh = this.state.arrDataCh;
        childData.forEach(function(value,index){
          var hash = {};
            hash["CountryName"] = value.CountryName;
            hash["SurveyYear"] = value.SurveyYear;
            hash["Indicator"] = value.Indicator;
            hash["CharacteristicLabel"] = value.CharacteristicLabel;
            hash["Value"] = value.Value;
            arrDataCh.push(hash);
        });
        var tmp = [];
         arrDataCh.forEach(function(value,index){
           tmp.push(value.CountryName);
         });
         // some countries are listed multiple times because they have multiple survey years
        var uniqCountries = Array.from(new Set(tmp))
        this.setState({ countries: this.state.countries.concat(uniqCountries) });
       }
  }
}

 // store the selected indicator in state
  handleIndicator(e){
    var selectedIndicator = e.target.value;
    console.log("selected Indicator", selectedIndicator);
    var strIndicator = selectedIndicator.toString();
    this.setState({selectedIndicator: selectedIndicator});
    this.setState({ isIndicatorDisabled: true });
    this.setState({ isCountryDisabled: false });
    this.populateData(strIndicator);
  }

  // store the selected country from dropdown menu in state
   handleCountry(e){
     var selectedCountry = e.target.value;
     console.log("selected country",selectedCountry);
     this.setState({ selectedCountry: selectedCountry });
     this.setState({ isCountryDisabled: true });
     this.setState({ isCharacteristicDisabled: false });
   }

 // store selected characterstic in state
 handleCharacteristic(e){
   var selectedCharacteristic = e.target.value;
   console.log("selected characterstic", selectedCharacteristic);
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
         var hash = {};
         var key = xAxisCategories[i].toString();
         var value = yAxisValues[i];
         var x, y;
         data.push({x: key, y: value});
       }
       console.log("years", years);
       console.log("values", values);
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

       for (var i = 0; i < xAxisCategories.length; i++){
         var hash = {};
         var key = xAxisCategories[i].toString();
         var value = yAxisValues[i];
         var x, y;
         data.push({x: key, y: value});
       }
       console.log("years", years);
       console.log("values", values);
    }
 }

 handleQuery(e){
  // make the menu drop downs available again for a new query
  this.setState({isCountryDisabled: true, isIndicatorDisabled: false, isCharacteristicDisabled: true, selectedCountry: [], selectedIndicator: [], selectedCharacteristic: [], countries: ["Select a country"], data: [] });
 }

saveImage(){
  var input = document.getElementById('canvas');
  html2canvas(input)
  .then((canvas) =>{
    let imgData = canvas.toDataURL('image/png').replace("image/png", "image/octet-stream");
     this.downloadURL(imgData);
  });
}

downloadURL(imgData){
  var a = document.createElement('a');
  a.href = imgData.replace("image/png", "image/octet-stream");
  a.download = 'graph.png';
  a.click();
}

 render (){
   var date = new Date();
   var dateStr = date.toISOString().slice(0,10);
   var fileName = this.state.selectedIndicator + '.png';



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

      <select className="dropDown" onChange={(e) => this.handleIndicator(e)}     value={this.state.selectedIndicator} disabled={this.state.isIndicatorDisabled}>
          {
            this.state.indicators.map((ind) =>
              <option key={this.getKey()}>{ind ? ind : "Select an indicator"}</option>
            )
          }
      </select>

      <select className="dropDown" onChange={(e) => this.handleCountry(e)} value={this.state.selectedCountry} disabled={this.state.isCountryDisabled}>
       {
         this.state.countries.map((country) =>
          <option key={this.getKey()}>{country ? country : "Select a country"}</option>
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
  <button onClick={() => this.saveImage()}>Save</button>
</div>
</div>
   );
 }

}

export default Archives
