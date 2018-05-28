import React, { Component } from 'react';
import './Jumbotron.css'

class Jumbotron extends Component {
  render(){
    return(
   <div className="jumbotron jumbotron-fluid">
     <div className="container">
      <h1 className="display-3">{this.props.title}</h1>
     </div>
   </div>

    );
  }

}

export default Jumbotron;
