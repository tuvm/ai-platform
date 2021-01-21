import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./configStore";
import { BASE_FE_PREFIX } from "./utils/constants/config";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import './utils/localeProvider/i18n';

window.BUILD_INFO = process.env.BUILD_TIME + "-" + process.env.BUILD_USERNAME;

ReactDOM.render(
  <React.Fragment>
    <Provider store={store}>
      <BrowserRouter basename={BASE_FE_PREFIX}>
        <App />
      </BrowserRouter>
    </Provider>
  </React.Fragment>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
