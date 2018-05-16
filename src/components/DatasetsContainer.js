import React, { Component } from 'react';
import axios from 'axios';

class DatasetsContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      datasets: []
    }
  }
  render() {
    return (
      <div className="DatasetsContainer">
         Datasets
      </div>
    );
  }
}

export default DatasetsContainer;
