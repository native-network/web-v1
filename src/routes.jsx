import React from 'react';
import { Route, Switch } from 'react-router';

import Home from './views/home/Home';
import Tribes from './views/tribes/Tribes';
import Tribe from './views/tribe/Tribe';
import Project from './views/project/Project';
import Projects from './views/projects/Projects';
import FourOhFour from './views/404/404';

export const routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/tribes" component={Tribes} />
      <Route exact path="/tribe/:tribeId" component={Tribe} />
      <Route path="/tribe/:tribeId/projects" component={Projects} />
      <Route path="/tribe/:tribeId/project/:projectId" component={Project} />
      <Route component={FourOhFour} />
    </Switch>
  );
};
