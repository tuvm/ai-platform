import Axios from 'axios';
import Keycloak from 'keycloak-js';
import { get } from 'lodash';
import {
  API_ENV,
  CURRENT_PROJECT,
  DEFAULT_REALM_ID,
  PROJECT_TOKEN,
  TOKEN,
} from '../../utils/constants/config';
import { CONFIG_SERVER } from '../../utils/constants/config';
import cookie from 'js-cookie';
import { actionLogout } from './systemAction';

const { AUDIENCE, REACT_APP_AUTH_URL } = CONFIG_SERVER;

const _kc = new Keycloak({
  realm: process.env.REACT_APP_KEYCLOAK_REALM || 'cad',
  url:
    process.env.REACT_APP_AUTH_URL + '/auth' ||
    'http://console.local.ai:8088/auth',
  clientId: process.env.REACT_APP_KEYCLOAK_CLIENT_ID || 'console-ui',
});

_kc.onTokenExpired = () => {
  console.log('token expired', _kc.token);
  _kc
    .updateToken(5)
    .then(() => {
      _requestPermissionToken(_kc.token, () => {});
      if (cookie.get(CURRENT_PROJECT)) {
        _requestProjectToken(_kc.token, cookie.get(CURRENT_PROJECT), () => {});
      }
    })
    .catch(doLogin);
};

const hasPerm = (tickets, perm_list) => {
  // const tickets = window.store.getState().system.ticket;
  if (!tickets) return false;
  for (let scope of Object.keys(tickets)) {
    for (let perm of perm_list) {
      if (tickets[scope].perms.includes(perm)) {
        return true;
      }
    }
  }
  return false;
};

/**
 * Initializes Keycloak instance and calls the provided callback function if successfully authenticated.
 *
 * @param onAuthenticatedCallback
 */
const initKeycloak = (
  onAuthenticatedCallback,
  onAuthenticateFailedCallback
) => {
  _kc
    .init({
      onLoad: 'login-required',
    })
    .then((authenticated) => {
      if (!authenticated) {
        console.log('user is not authenticated..!');
      }
      _requestPermissionToken(
        _kc.token,
        onAuthenticatedCallback,
        onAuthenticateFailedCallback
      );
      try {
        const path = window.location.pathname;
        const projectId = path.split('projects/')[1].split('/')[0];
        if (projectId) {
          _requestProjectToken(_kc.token, projectId, () => {});
        }
      } catch (err) {
        console.log(err);
      }
    })
    .catch(onAuthenticateFailedCallback);
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
      url:
        REACT_APP_AUTH_URL +
        `/auth/realms/${
          _kc.realm || DEFAULT_REALM_ID
        }/protocol/openid-connect/token`,
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
      cookie.set(PROJECT_TOKEN, data.access_token, {
        expires: new Date(
          ((res.data.expires_in || 300) - 30) * 1000 + Date.now()
        ),
      });
      cookie.set(CURRENT_PROJECT, projectId);
      callback();
    }
  });
};

const _requestPermissionToken = (token, callback, failedCallback) => {
  if (token) {
    let requestBody = new URLSearchParams();
    requestBody.append(
      'grant_type',
      'urn:ietf:params:oauth:grant-type:uma-ticket'
    );
    requestBody.append('audience', AUDIENCE);
    requestBody.append('permission', 'cad');

    Axios(
      {
        url:
          REACT_APP_AUTH_URL +
          `/auth/realms/${
            _kc.realm || DEFAULT_REALM_ID
          }/protocol/openid-connect/token`,
        method: 'post',
        data: requestBody,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      API_ENV.AUTH
    )
      .then((res) => {
        if (res && res.data && res.data.access_token) {
          const { data } = res;
          // localStorage.setItem(TOKEN, data.access_token);
          cookie.set(TOKEN, data.access_token, {
            expires: new Date(
              ((res.data.expires_in || 300) - 30) * 1000 + Date.now()
            ),
          });
          callback();
        }
      })
      .catch((err) => {
        console.log(err);
        const errorCode = get(err, 'response.status');
        if (errorCode === 401) {
          actionLogout();
        } else if (failedCallback) {
          failedCallback();
        }
      });
  } else {
    console.log('no token');
    if (failedCallback) {
      failedCallback();
    }
  }
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

const getProjectToken = (projectId) => {
  if (projectId === cookie.get(CURRENT_PROJECT)) {
    return cookie.get(PROJECT_TOKEN);
  } else {
    return null;
  }
};
// localStorage.getItem(`${TOKEN}_${projectId}`);

const isLoggedIn = () => !!_kc.token;

const updateToken = (successCallback) => {
  _kc
    .updateToken(5)
    .then(_requestPermissionToken(_kc.token, successCallback))
    .catch(doLogin);
};

const updateProjectToken = (projectId, successCallback) => {
  _kc
    .updateToken(5)
    .then(_requestProjectToken(_kc.token, projectId, successCallback))
    .catch(doLogin);
};

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
  hasPerm,
};

export default UserService;
