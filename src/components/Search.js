import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';


class Search extends Component {

  constructor(props) {
   super(props)
   this.state = {
     countries: [],
     years: [],
     indicators: []
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
           <select>
              {countryItems}
           </select>
           <select>
              {yearItems}
           </select>
           <select>
              {indicatorItems}
           </select>
       </div>

    );
  }



}





export default Search
