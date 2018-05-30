import React, { Component } from 'react';
import axios from 'axios';

class Archives extends Component {

  constructor(props) {
   super(props)
   this.state = {
    infantData: {}, // stores API query for infant mortality rates
    childData: {}, // stores API query for child mortality rates
    selectedCountry: [], // stores user selected country
    arrDataInf: [], // holds infant mortality for selected country
    arrDataCh: [], // holds child mortality rates for selected country
    indicators: ["Infant Mortality Rate", "Under Five Mortality Rate"],
    selectedIndicator: [], // stores users indicator selection
    years: [], // stores available years for selected country and indicator
    characteristics: ["Total"] // available characteristic label for both mortality rates
   }
   this.getInfantMortality = this.getInfantMortality.bind(this);
   this.getChildMortality = this.getChildMortality.bind(this);
 }

 componentDidMount(){
   this.getInfantMortality();
 }

async getInfantMortality(){
  var axiosInstance = axios.create({
    baseURL: 'http://localhost:3001/api/v2'
  })
  try {
   let response = await axiosInstance.get('/infant_mortalities.json')
   if(response.status === 200){
     var infantData = {};
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
     var childData = {};
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


// Have not tested the populateData or populateCountries methods yet...left off here...
populateData(strCountry, strIndicator){
  var selectedCountry = strCountry;
  var selectedIndicator = strIndicator;

  if (selectedIndicator === "Infant Mortality Rate"){
      var infantData = this.state.infantData;
        if (infantData) {
          var arrDataInf = [];
          infantData.forEach(function(value,index){
            var hash = {};
              hash["CountryName"] = value.CountryName;
              hash["SurveyYear"] = value.SurveyYear;
              hash["Indicator"] = value.Indicator;
              hash["CharacteristicLabel"] = value.CharacteristicLabel;
              hash["Value"] = value.Value;
              arrDataInf.push(hash);
          });
          var years = [];
           arrDataInf.forEach(function(value,index){
             if (value.CountryName === selectedCountry){
               years.push(value.SurveyYear);
             }
           });
           this.setState({ years: years });
         }
  } else if(selectedIndicator === "Under Five Mortality Rate"){
    var childData = this.state.childData;
      if (childData) {
        var arrDataCh = [];
        childData.forEach(function(value,index){
          var hash = {};
            hash["CountryName"] = value.CountryName;
            hash["SurveyYear"] = value.SurveyYear;
            hash["Indicator"] = value.Indicator;
            hash["CharacteristicLabel"] = value.CharacteristicLabel;
            hash["Value"] = value.Value;
            arrDataCh.push(hash);
        });
        var years = [];
         arrDataCh.forEach(function(value,index){
           if (value.CountryName === selectedCountry){
             years.push(value.SurveyYear);
           }
         });
         this.setState({ years: years });
       }
  }
}

populateCountries(strIndicator){
 if(strIndicator === "Infant Mortality Rate"){
   var arrDataInf = this.state.arrDataInf;
   var countries = [];
   if(arrDataInf){
     arrDataInf.forEach(function(value,index){
       countries.push(value.CountryName);
     });
   }
   this.setState({ countries: countries });
 } else if(strIndicator === "Under Five Mortality Rate"){
   var arrDataCh = this.state.arrDataCh;
   var countries = [];
   if(arrDataCh){
     arrDataCh.forEach(function(value,index){
       countries.push(value.CountryName);
     });
   }
   this.setState({ countries: countries });
 }


}


 render (){
   return(
    <div>
    //  add in menu options...

    </div>
   );
 }

}

export default Archives
