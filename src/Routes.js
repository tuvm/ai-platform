import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { routes } from './utils/constants/config';
import APIsAndServices from './view/APIsAndServices';
import { Jobs } from './view/Jobs';
import Projects from './view/Projects';
// import APIKeys from './view/APIKeys';
import ProjectSetting from './view/ProjectSetting';
import Users from './view/Users';
import Models from './view/Models';

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
      <Route exact path="/projects/:projectId/users" component={Users} />
      <Route exact path="/projects/:projectId/jobs" component={Jobs} />
      <Route exact path="/projects/:projectId/models" component={Models} />
      <Route exact path="/projects" component={Projects} />
      {/* <Route exact path={routes.API_KEYS} component={APIKeys} /> */}
    </Switch>
  );
};

export default Routes;
