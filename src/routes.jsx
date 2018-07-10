import React from 'react';
import { Route, Switch } from 'react-router';

import Home from './views/home/Home';
import Tribe from './views/tribe/Tribe';

export const routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/:id" component={Tribe} />
    </Switch>
  );
};
