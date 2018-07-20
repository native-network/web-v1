import React from 'react';
import { Route, Switch } from 'react-router';

import Home from './views/home';
import Tribes from './views/tribes';
import Tribe from './views/tribe';
import Tokens from './views/tokens';
import FAQ from './views/faq';
import Project from './views/project';
import FourOhFour from './views/404';

export const routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/tribes" component={Tribes} />
      <Route path="/tokens" component={Tokens} />
      <Route path="/learn" component={FAQ} />
      <Route exact path="/tribe/:tribeId" component={Tribe} />
      <Route path="/tribe/:tribeId/project/:projectId" component={Project} />
      <Route component={FourOhFour} />
    </Switch>
  );
};
