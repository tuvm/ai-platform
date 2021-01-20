import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { routes } from './utils/constants/config';
import Project from './view/project/Project';
import Home from './view/project/Project';

const Routes = (props) => {
  return (
    <Switch>
      <Route exact from="/" component={Home} />
      <Route exact path={routes.API_AND_SERVICES} component={Project} />
      <Route exact path={routes.TOKEN_GENERATOR} component={Project} />
      <Route exact path={routes.BILLING} component={Project} />
      <Route exact path={routes.SETTING} component={Project} />
    </Switch>
  );
};

export default Routes;
