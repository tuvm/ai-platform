import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { routes } from './utils/constants/config';
import APIsAndServices from './view/APIsAndServices';
import Home from './view/Home';
import TokenGenerator from './view/TokenGenerator';

const Routes = (props) => {
  return (
    <Switch>
      <Route exact from="/" component={Home} />
      <Route exact path={routes.API_AND_SERVICES} component={APIsAndServices} />
      <Route exact path={routes.TOKEN_GENERATOR} component={TokenGenerator} />
      <Route exact path={routes.BILLING} component={Home} />
      <Route exact path={routes.SETTING} component={Home} />
    </Switch>
  );
};

export default Routes;
