import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';


class Search extends Component {

  constructor(props) {
   super(props)
   this.state = {
     countries: [], // array of countries to populate dropdown menu
     years: [], // array of suvey years to populate dropdown menu
     indicators: [], // array of suvey years to populate dropdown menu
     selectedCountry: [], // keeps track of current country when selected from dropdown
     selectedYear: [], // keeps track of current year selected from dropdown
     selectedIndicator: [] // keeps track of current indicator selected from dropdown
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

 handleCountry(e){
   console.log(e.target.value);
   this.setState({selectedCountry: e.target.value});

 }

 handleYear(e){
   console.log(e.target.value);
   this.setState({selectedYear: e.target.value});

 }

 handleIndicator(e){
   console.log(e.target.value);
   this.setState({selectedIndicator: e.target.value});

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
       <select className="dropDown" onChange={(e) => this.handleCountry(e)}>
          {countryItems}
       </select>
       <p>Survey Years: </p>
       <select className="dropDown" onChange={(e) => this.handleYear(e)}>
          {yearItems}
       </select>
       <p>Indicators: </p>
       <select className="dropDown" onChange={(e) => this.handleIndicator(e)}>
          {indicatorItems}
       </select>
       </div>

    );
  }



}





export default Search
