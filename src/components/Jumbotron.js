import React, { Component } from 'react';
import './Jumbotron.css'

class Jumbotron extends Component {
  render(){
    return(
   <div className="jumbotron">
     <div className="container">
      <h1 className="display-3">{this.props.title}</h1>
      <div className="media">
        <h6 className="media-body">An easy to use tool for exploring, visualizing, and downloading data from popular public health databases.></h6>
      </div>

     </div>
   </div>
    );
  }

}

export default Jumbotron;
