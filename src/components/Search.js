import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';


class Search extends Component {

  constructor(props) {
   super(props)
   this.state = {
     countries: [],
     years: [],
     indicators: [],
     characteristics: [],
     arrData: {}
   }
 }

 componentDidMount() {
  this.getCountries();
  this.getSurveyYears();
  this.getIndicators();
 }

 getCountries(){
   axios.get('https://api.dhsprogram.com/rest/dhs/countries')
   .then(response => {
     console.log(response.data.Data[0])
     this.setState({
       countries: response.data.Data
     });
   });
 }

 getSurveyYears(){
   axios.get('https://api.dhsprogram.com/rest/dhs/surveys')
   .then(response => {
     console.log(response.data.Data[0])
     this.setState({
       years: response.data.Data
     });
   });
 }

 getIndicators(){
    axios.get('https://api.dhsprogram.com/rest/dhs/indicators')
    .then(response => {
      console.log(response.data.Data[0])
      this.setState({
        indicators: response.data.Data
      });
    });
 }


// This should be called onChange, when the user makes a selection from drop down
getCharacteristics(){
    axios.get('https://api.dhsprogram.com/rest/dhs')
    .then(response => {
      this.setState({
        characteristics: response.data.Data
      });
    });
  }
  // not every indicator will have a characteristic category, so if not, create it.
  let characteristics = this.state.characteristics;
  let arrData = {};

 this.state.characteristics.map((value, index) => {
   if(!arrData[value.CharacteristicCategory]) {
       arrData[value.CharacteristicCategory] = {};
       arrData[value.CharacteristicCategory][value.CharacteristicLabel] = {};
       arrData[value.CharacteristicCategory][value.CharacteristicLabel][value.ByVariableLabel] = value.Value;
   }
   else if(!arrData[value.CharacteristicCategory][value.CharacteristicLabel])
   {
       arrData[value.CharacteristicCategory][value.CharacteristicLabel] = {};
       arrData[value.CharacteristicCategory][value.CharacteristicLabel][value.ByVariableLabel] = value.Value;
   }
   else if(!arrData[value.CharacteristicCategory][value.CharacteristicLabel][value.ByVariableLabel])
   {
       if(value.ByVariableLabel.length > 0)
       {
           arrData[value.CharacteristicCategory][value.CharacteristicLabel][value.ByVariableLabel] = value.Value;
       }
   }
   else
   {
       if(value.ByVariableLabel.length > 0)
       {
           arrData[value.CharacteristicCategory][value.CharacteristicLabel][value.ByVariableLabel] = value.Value;
       }
   }
 })
}


  render(){
    let countries = this.state.countries;
    let countryItems = countries.map((country) =>
      <option key={country.DHS_CountryCode}>{country.CountryName}</option>
  );

    let years = this.state.years;
    let yearItems = years.map((year) =>
      <option key={year.SurveyId}>{year.SurveyYearLabel}</option>
  );

  let indicators = this.state.indicators;
  let indicatorItems = indicators.map((ind) =>
    <option key={ind.IndicatorId}>{ind.Label}</option>
);


    return (
   <div>
       <p>Countries: </p>
       <select className="dropDown">
          {countryItems}
       </select>
       <p>Survey Years: </p>
       <select className="dropDown">
          {yearItems}
       </select>
       <p>Indicators: </p>
       <select className="dropDown">
          {indicatorItems}
       </select>
       </div>

    );
  }



}





export default Search
