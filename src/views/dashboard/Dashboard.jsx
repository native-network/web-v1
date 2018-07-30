import React, { Component } from 'react';
import { connect } from 'react-redux';

export class Dashboard extends Component {
  render() {
    return <div>Dashboard!</div>;
  }
}

export default connect(
  null,
  null,
)(Dashboard);
