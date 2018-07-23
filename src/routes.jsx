import React from 'react';
import { Route, Switch } from 'react-router';

import Home from './views/home';
import Tribes from './views/tribes';
import Tribe from './views/tribe';
import Tokens from './views/tokens';
import FAQ from './views/faq';
import FourOhFour from './views/404';

export const routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/tribes" component={Tribes} />
      <Route exact path="/tribe/:tribeId" component={Tribe} />
      <Route path="/tokens" component={Tokens} />
      <Route exact path="/learn" component={FAQ} />
      <Route component={FourOhFour} />
    </Switch>
  );
};
