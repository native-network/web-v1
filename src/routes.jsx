import React from 'react';
import { Redirect, Route, Switch } from 'react-router';

import Home from './views/home';
import Communities from './views/communities';
import Dashboard from './views/dashboard';
import Community from './views/community';
import Tokens from './views/tokens';
import FAQ from './views/faq';
import Terms from './views/terms';
import CommunityAdmin from './views/community-admin';
import Manage from './views/manage';
import FourOhFour from './views/404';

export const PrivateRoute = ({ component: Component, isCurator, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isCurator ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/',
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

export const routes = (isCurator) => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/communities" component={Communities} />
      <Route exact path="/community/:communityId" component={Community} />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route path="/tokens" component={Tokens} />
      <Route exact path="/learn" component={FAQ} />
      <Route exact path="/terms" component={Terms} />
      <PrivateRoute
        isCurator={isCurator}
        exact
        path="/manage/:communityId"
        component={CommunityAdmin}
      />
      <PrivateRoute
        isCurator={isCurator}
        exact
        path="/manage"
        component={Manage}
      />
      <Route component={FourOhFour} />
    </Switch>
  );
};
