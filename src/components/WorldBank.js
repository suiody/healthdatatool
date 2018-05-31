import React, { Component } from 'react';
import axios from 'axios';
import NavBar from './NavBar';

class WorldBank extends Component {
  constructor(props) {
   super(props)
   this.state = {
    indicators: [],
    topics: []
   }
 }


 getIndicators(){
   axios.get('http://api.worldbank.org/v2/countries/all/indicators/SP.POP.TOTL?format=json')
   .then(response => {
     console.log("world bank indicators");
     console.log(response.data);
     this.setState({
       indicators: response.data
     });
   });
 }

getTopics(){
  axios.get('http://api.worldbank.org/v2/topics?format=json')
  .then(response => {
    console.log("topics");
    console.log(response.data);
    this.setState({
      topics: response.data
    });
  });
}

render(){
  return(
    <div>
    <NavBar />

    </div>
  );
   }
}

export default WorldBank;
