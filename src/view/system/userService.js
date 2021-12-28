import Axios from 'axios';
import Keycloak from 'keycloak-js';
import { API_ENV, TOKEN } from '../../utils/constants/config';
import { getAuthUrl } from './systemAction';
import { CONFIG_SERVER } from '../../utils/constants/config';
import cookie from 'js-cookie';

const { AUDIENCE } = CONFIG_SERVER;

const _kc = new Keycloak({
  realm: process.env.REACT_APP_KEYCLOAK_REALM || 'cad',
  url:
    process.env.REACT_APP_AUTH_URL + '/auth' ||
    'http://console.local.ai:8088/auth',
  clientId: process.env.REACT_APP_KEYCLOAK_CLIENT_ID || 'console-ui',
});

/**
 * Initializes Keycloak instance and calls the provided callback function if successfully authenticated.
 *
 * @param onAuthenticatedCallback
 */
const initKeycloak = (onAuthenticatedCallback) => {
  _kc
    .init({
      onLoad: 'login-required',
    })
    .then((authenticated) => {
      if (!authenticated) {
        console.log('user is not authenticated..!');
      }
      _requestPermissionToken(_kc.token, onAuthenticatedCallback);
    })
    .catch(console.error);
};

const _requestProjectToken = (token, projectId, callback) => {
  let requestBody = new URLSearchParams();
  requestBody.append(
    'grant_type',
    'urn:ietf:params:oauth:grant-type:uma-ticket'
  );
  requestBody.append('audience', AUDIENCE);
  if (projectId) {
    requestBody.append('permission', `cad/${projectId}`);
  }

  Axios(
    {
      url: getAuthUrl(),
      method: 'post',
      data: requestBody,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    API_ENV.AUTH
  ).then((res) => {
    if (res && res.data && res.data.access_token) {
      const { data } = res;
      // localStorage.setItem(`${TOKEN}_${projectId}`, data.access_token);
      cookie.set(`${TOKEN}_${projectId}`, data.access_token, {
        expires: new Date((res.data.expires_in || 1800) * 1000 + Date.now()),
      });
      callback();
    }
  });
};

const _requestPermissionToken = (token, callback) => {
  let requestBody = new URLSearchParams();
  requestBody.append(
    'grant_type',
    'urn:ietf:params:oauth:grant-type:uma-ticket'
  );
  requestBody.append('audience', AUDIENCE);
  requestBody.append('permission', '#project.org.get');
  requestBody.append('permission', 'cad');

  Axios(
    {
      url: getAuthUrl(),
      method: 'post',
      data: requestBody,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    API_ENV.AUTH
  ).then((res) => {
    if (res && res.data && res.data.access_token) {
      const { data } = res;
      // localStorage.setItem(TOKEN, data.access_token);
      cookie.set(TOKEN, data.access_token, {
        expires: new Date((res.data.expires_in || 1800) * 1000 + Date.now()),
      });
      callback();
    }
  });
};

const doLogin = _kc.login;

const doLogout = _kc.logout;

const getToken = () => _kc.token;

const getPermissionToken = () => {
  // const token = localStorage.getItem(TOKEN);
  const token = cookie.get(TOKEN);
  // console.log(token);
  return token;
};

const getProjectToken = (projectId) => cookie.get(`${TOKEN}_${projectId}`);
// localStorage.getItem(`${TOKEN}_${projectId}`);

const isLoggedIn = () => !!_kc.token;

const updateToken = (successCallback) =>
  _kc
    .updateToken(5)
    .then(_requestPermissionToken(_kc.token, successCallback))
    .catch(doLogin);

const updateProjectToken = (projectId, successCallback) =>
  _kc
    .updateToken(5)
    .then(_requestProjectToken(_kc.token, projectId, successCallback))
    .catch(doLogin);

const getUsername = () => _kc.tokenParsed?.preferred_username;

const hasRole = (roles) => roles.some((role) => _kc.hasRealmRole(role));

const loadUserProfile = () => _kc.loadUserProfile();

const loadUserInfo = () => _kc.loadUserInfo();

const UserService = {
  initKeycloak,
  doLogin,
  doLogout,
  isLoggedIn,
  getToken,
  getPermissionToken,
  getProjectToken,
  updateProjectToken,
  updateToken,
  getUsername,
  hasRole,
  loadUserProfile,
  loadUserInfo,
};

export default UserService;
