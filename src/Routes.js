import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { routes } from './utils/constants/config';
import APIsAndServices from './view/APIsAndServices';
import Projects from './view/Projects';
// import APIKeys from './view/APIKeys';
import ProjectSetting from './view/ProjectSetting';
import Users from './view/Users';

const Routes = (props) => {
  return (
    <Switch>
      <Route exact path="/" component={Projects} />
      <Route exact path={routes.API_AND_SERVICES} component={APIsAndServices} />
      <Route
        exact
        path="/projects/:projectId/dashboard"
        component={APIsAndServices}
      />
      <Route
        exact
        path="/projects/:projectId/project-setting"
        component={ProjectSetting}
      />
      <Route exact path="/projects" component={Projects} />
      <Route exact path="/users" component={Users} />
      {/* <Route exact path={routes.API_KEYS} component={APIKeys} /> */}
    </Switch>
  );
};

export default Routes;
