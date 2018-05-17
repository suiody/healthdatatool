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
   // fetch the country data, it will be returned as json by default
   axios.get('https://api.dhsprogram.com/rest/dhs/countries')
   .then(response => {
     console.log(response.data.Data[0])
     this.setState({
       countries: response.data.Data
     });
   });

   axios.get('https://api.dhsprogram.com/rest/dhs/surveys')
   .then(response => {
     console.log(response.data.Data[0])
     this.setState({
       years: response.data.Data
     });
   });

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


    return (
   <div>
           <select>
              {countryItems}
           </select>
           <select>
              {yearItems}
           </select>
       </div>

    );
  }



}





export default Search
