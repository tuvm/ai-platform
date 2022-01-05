import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './configStore';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './utils/localeProvider/i18n';
import UserService from './view/system/userService';
import NoPermission from './view/NoPermission/index';
// import HttpService from './view/system/httpService';

window.BUILD_INFO = process.env.BUILD_TIME + '-' + process.env.BUILD_USERNAME;

const renderApp = () =>
  ReactDOM.render(
    <React.Fragment>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </React.Fragment>,
    document.getElementById('root')
  );

const renderNoPermission = () => {
  ReactDOM.render(
    <React.Fragment>
      <Provider store={store}>
        <BrowserRouter>
          <NoPermission />
        </BrowserRouter>
      </Provider>
    </React.Fragment>,
    document.getElementById('root')
  );
};

UserService.initKeycloak(renderApp, renderNoPermission);
// HttpService.configure();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
