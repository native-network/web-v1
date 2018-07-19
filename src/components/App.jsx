import React, { Component, Fragment } from 'react';
import { hot } from 'react-hot-loader';

import Header from './shared/header';
import { routes } from '../routes';

class App extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        {routes()}
      </Fragment>
    );
  }
}

export default hot(module)(App);
