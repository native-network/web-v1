import React from 'react';
import { Route, Switch } from 'react-router';

import Home from './views/home/Home';

export const routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
    </Switch>
  );
};
