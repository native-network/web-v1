import React, { Component } from 'react';
import { connect } from 'react-redux';

export class Tribe extends Component {

  componentDidMount() {
    console.log(this.props);
  }

  render() {
    return (
      <div>Tribe</div>
    );
  }
}

export default connect(null, null)(Tribe);
