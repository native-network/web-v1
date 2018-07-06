import React, { Component, Fragment } from 'react';

import Navigation from './navigation/Navigation';
import { routes } from '../routes';

class App extends Component {
  render() {
    return (
      <Fragment>
        <Navigation />
        {routes()}
      </Fragment>
    );
  }
}

export default App;
