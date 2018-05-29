import React, { Component } from 'react';
import axios from 'axios';

class Archives extends Component {

  constructor(props) {
   super(props)
   this.state = {
    infantData: {},
    childData: {}
   }

   this.getInfantMortality = this.getInfantMortality.bind(this);
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
   window.alert("There was a problem connecting to the archives. Please try again later.")
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
   window.alert("There was a problem connecting to the archives. Please try again later.")
 }
}


 render (){
   return(
    <div>

    </div>
   );
 }

}

export default Archives
