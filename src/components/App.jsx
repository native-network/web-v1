import React, { Component, Fragment } from 'react';

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

export default App;
