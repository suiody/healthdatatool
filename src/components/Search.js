import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';
// import $ from 'jquery';

class Search extends Component {

  constructor(props) {
   super(props)
   this.state = {
     countries: []
   }
 }

componentDidMount() {

// This is wrong...it's being edited!
  var initialCountries = [];
  // fetch the country data, it will be returned as json by default
  axios.get('https://api.dhsprogram.com/rest/dhs/countries')
  .then(response => {
    console.log(response.data)
     return response.data.Data;
   }).then(data => {
    initialCountries = data.results.map((country, index) =>{
      return country
    });
    this.setState({
      countries: initialCountries
    });
  });
}


  render(){
    return (
   <div>

   </div>
    );
  }



}





export default Search
