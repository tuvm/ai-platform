import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { routes } from './utils/constants/config';
import APIsAndServices from './view/APIsAndServices';
import Home from './view/Home';

const Routes = (props) => {
  return (
    <Switch>
      <Route exact from="/" component={Home} />
      <Route exact path={routes.API_AND_SERVICES} component={APIsAndServices} />
      <Route exact path={routes.TOKEN_GENERATOR} component={Home} />
      <Route exact path={routes.BILLING} component={Home} />
      <Route exact path={routes.SETTING} component={Home} />
    </Switch>
  );
};

export default Routes;
