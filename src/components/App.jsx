import React, { Component, Fragment } from 'react';
import { hot } from 'react-hot-loader';

import Header from './header/Header';
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
