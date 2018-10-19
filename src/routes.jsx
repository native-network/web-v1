import React from 'react';
import { Redirect, Route, Switch } from 'react-router';

import Home from './views/home';
import Communities from './views/communities';
import Dashboard from './views/dashboard';
import Community from './views/community';
import Tokens from './views/tokens';
import Terms from './views/terms';
import CommunityAdmin from './views/community-admin';
import Settings from './views/settings';
import FourOhFour from './views/404';

export const PrivateRoute = ({
  component: Component,
  relations,
  isAuth,
  ...rest
}) => {
  const isRelated = (relations || []).includes(
    +rest.computedMatch.params.communityId,
  );
  return (
    <Route
      {...rest}
      render={(props) =>
        isRelated || isAuth ? (
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
};

export const routes = (user) => {
  const memberArray = user.memberOf.map((community) => community.id);
  const curatorArray = user.curatorOf.map((community) => community.id);
  const affiliatedArray = [...memberArray, ...curatorArray].filter(
    (item, pos, arr) => arr.indexOf(item) === pos,
  );
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/communities" component={Communities} />
      <PrivateRoute
        relations={affiliatedArray}
        exact
        path="/community/:communityId"
        component={Community}
      />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route path="/tokens" component={Tokens} />
      <Route exact path="/terms" component={Terms} />
      <PrivateRoute
        relations={curatorArray}
        exact
        path="/manage/:communityId"
        component={CommunityAdmin}
      />
      <Route exact path="/settings" component={Settings} />
      <Route component={FourOhFour} />
    </Switch>
  );
};
