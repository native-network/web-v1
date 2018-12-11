import React, { Component } from 'react';
import Loader from '../../../shared/loader';

class Processing extends Component {
  componentDidUpdate(prevProps) {
    if (prevProps.loading !== this.props.loading && !this.props.loading) {
      this.props.submitHandler();
    }
  }
  render() {
    return (
      <div style={{ position: 'relative', height: '20rem' }}>
        <Loader />
      </div>
    );
  }
}

export default Processing;
