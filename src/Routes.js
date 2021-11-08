import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { routes } from './utils/constants/config';
import APIsAndServices from './view/APIsAndServices';
import Projects from './view/Dashboard/Projects';
// import Home from './view/Home';
import APIKeys from './view/APIKeys';
// import Billing from './view/Billing';

const Routes = (props) => {
  return (
    <Switch>
      <Route exact from="/" component={APIsAndServices} />
      <Route exact from="/dashboard/projects" component={Projects} />
      <Route exact path={routes.API_AND_SERVICES} component={APIsAndServices} />
      <Route exact path={routes.API_KEYS} component={APIKeys} />
      {/* <Route exact path={routes.BILLING} component={Billing} /> */}
      {/* <Route exact path={routes.SETTING} component={Home} /> */}
    </Switch>
  );
};

export default Routes;
