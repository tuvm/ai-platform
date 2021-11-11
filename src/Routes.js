import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { routes } from './utils/constants/config';
import APIsAndServices from './view/APIsAndServices';
import Projects from './view/Projects';
// import APIKeys from './view/APIKeys';
import ProjectSetting from './view/ProjectSetting';

const Routes = (props) => {
  return (
    <Switch>
      <Route exact from="/" component={Projects} />
      <Route from={routes.PROJECTS} component={Projects} />
      <Route path={`/project/:projectId/${routes.DASHBOARD}`} component={APIsAndServices} />
      <Route path={`/project/:projectId/${routes.PROJECT_SETTING}`} component={ProjectSetting} />
      {/* <Route exact path={routes.API_KEYS} component={APIKeys} /> */}
    </Switch>
  );
};

export default Routes;
