import React from 'react';
import { Redirect, Route, Switch } from 'react-router';

import Home from './views/home';
import Tribes from './views/tribes';
import Dashboard from './views/dashboard';
import Tribe from './views/tribe';
import Tokens from './views/tokens';
import FAQ from './views/faq';
import TribeAdmin from './views/tribe-admin';
import Manage from './views/manage';
import FourOhFour from './views/404';

export const PrivateRoute = ({
  component: Component,
  isAuthenticated,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated ? (
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

export const routes = (isAuthenticated) => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/tribes" component={Tribes} />
      <Route exact path="/tribe/:tribeId" component={Tribe} />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route path="/tokens" component={Tokens} />
      <Route exact path="/learn" component={FAQ} />
      <PrivateRoute
        isAuthenticated={isAuthenticated}
        exact
        path="/manage/:tribeId"
        component={TribeAdmin}
      />
      <PrivateRoute
        isAuthenticated={isAuthenticated}
        exact
        path="/manage"
        component={Manage}
      />
      <Route component={FourOhFour} />
    </Switch>
  );
};
