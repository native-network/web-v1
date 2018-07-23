import React, { Component, Fragment } from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';

import Header from './shared/header';
import { routes } from '../routes';

export class App extends Component {
  render() {
    return (
      <Fragment>
        <Header location={this.props.location} />
        {routes()}
      </Fragment>
    );
  }
}

App = connect(
  (state) => {
    return {
      location: state.router.location
    };
  },
  null
)(App);

export default hot(module)(App);
