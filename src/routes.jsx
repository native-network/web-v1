import React from 'react';
import { Route, Switch } from 'react-router';

import Home from './views/home/Home';
import Tribes from './views/tribes/Tribes';
import Tribe from './views/tribe/Tribe';
import FourOhFour from './views/404/404';

export const routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/tribes" component={Tribes} />
      <Route path="/tribe/:id" component={Tribe} />
      <Route component={FourOhFour} />
    </Switch>
  );
};
