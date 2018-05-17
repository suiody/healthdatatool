import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';


class Search extends Component {

  constructor(props) {
   super(props)
   this.state = {
     countries: []
   }
 }

 componentDidMount() {
   // fetch the country data, it will be returned as json by default
   axios.get('https://api.dhsprogram.com/rest/dhs/countries')
   .then(response => {
     console.log(response.data)
     this.setState({
       countries: response.data
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
