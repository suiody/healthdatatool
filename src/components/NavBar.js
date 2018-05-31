import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavBar extends Component {
  render() {
    return (

      <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4 fixed-top">

        <div className="container">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="navbar-brand" to="/">Health Data Tool</Link>
            </li>
          </ul>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">About</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/dhs">Demographic Health Survey</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/archives">Archives</Link>
              </li>
            </ul>
            </div>
          </div>
        </nav>
    );
  }


}
export default NavBar;
