import React, { Component } from 'react';
import { Link } from "react-router-dom";
import NavBar from './NavBar';
import './MaternalMortalityRates.css';
import bubble from './../images/bubblechart.png';
import bar from './../images/barchart.png';


class MaternalMortalityRates extends Component {

render(){
  return(
    <div className="container">
    <NavBar />
    <div className="container-fluid" >
     <div className="maternalHealth">
      <Link to='/mmrbubblecharts'>Bubble Charts
       <img width={300} height={250} alt="" src={bubble}/>
      </Link>
      <Link to='/mmrbarcharts'>Bar Charts
        <img width={300} height={250} alt="" src={bar} />
      </Link>
    </div>
    </div>
  </div>
  );
   }
}

export default MaternalMortalityRates;
