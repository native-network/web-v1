import React, { Component } from 'react';
import { connect } from 'react-redux';

import logo from '../../assets/img/logo.svg';

import './Home.css';

export class Home extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Hello World</h1>
        </header>
      </div>
    );
  }
}

export default connect(null, null)(Home);
