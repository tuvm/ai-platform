import axios from 'axios';
import Qs from 'qs';
import get from 'lodash/get';
import {
  // TOKEN,
  // REFRESH_TOKEN,
  // LOCAL_STORAGE_REALM_ID,
  API_ENV,
  PROJECT_TOKEN,
  TOKEN,
} from '../../utils/constants/config';
// import {
//   actionGetPermissionToken,
//   actionGetTenantSetting,
//   actionGetToken,
//   actionLogout,
//   actionRefreshToken,
//   requestLogin,
// } from './systemAction';
import cookie from 'js-cookie';
import UserService from './userService';
import { actionLogout } from './systemAction';

const request = axios.create();

let updatingGeneralToken = false;
let updatingProjectToken = false;

// const getToken = async (code, sessionState) => {
//   try {
//     const res = await actionGetToken(code, sessionState);
//     if (res && res.data && res.data.access_token) {
//       actionGetPermissionToken(res.data.access_token);
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

// async function callRefreshToken(refreshToken) {
//   try {
//     const res = await actionRefreshToken(refreshToken);

//     if (res && res.data && res.data.access_token) {
//       const accessToken = res.data.access_token;
//       cookie.remove(TOKEN);
//       actionGetPermissionToken(accessToken);
//     }
//   } catch (error) {
//     actionLogout();
//   }
// }

// const checkAuthorizationFlow = async () => {
//   let reamId = localStorage.getItem(LOCAL_STORAGE_REALM_ID);

//   if (!reamId) {
//     const res = await actionGetTenantSetting();
//     if (res && res.data && res.data.realm_id) {
//       reamId = res.data.realm_id;
//     }
//   }

//   if (reamId) {
//     authorization();
//   }
// };

// const authorization = () => {
//   const refreshToken = cookie.get(REFRESH_TOKEN);

//   // no refresh token
//   if (!refreshToken) {
//     const urlParams = new URLSearchParams(window.location.search);
//     const code = urlParams.get('code');
//     const sessionState = urlParams.get('session_state');
//     // console.log({code, sessionState})
//     if (code) {
//       getToken(code, sessionState);
//     } else {
//       requestLogin(true);
//     }
//   } else {
//     callRefreshToken(refreshToken);
//   }
// };

let pendingGeneralRequests = [];
let pendingProjectRequests = [];

function onGeneralTokenFetched(access_token) {
  pendingGeneralRequests = pendingGeneralRequests.map((callback) =>
    callback(access_token)
  );
  pendingGeneralRequests = [];
}

function onProjectTokenFetched(access_token) {
  pendingProjectRequests = pendingProjectRequests.map((callback) =>
    callback(access_token)
  );
  pendingProjectRequests = [];
}

function addPendingGeneralRequest(callback) {
  pendingGeneralRequests.push(callback);
}

function addPendingProjectRequest(callback) {
  pendingProjectRequests.push(callback);
}

const api = (options = {}, apiEnv = API_ENV.BACKEND, scope = 'global') => {
  let config = {
    baseURL: apiEnv,
    ...options,
    paramsSerializer: (params) =>
      Qs.stringify(params, { arrayFormat: 'repeat' }),
    headers: {
      Accept: '*/*',
      ...options.headers,
    },
    scope: scope,
  };

  // console.log(`api token ${cookie.get(TOKEN)}`);
  // console.log(`api token cookie ${JSON.stringify(cookie.cookieData)}`);
  // if (cookie.get(TOKEN) && cookie.get(REFRESH_TOKEN)) {
  if (scope === 'global') {
    if (
      !(
        UserService &&
        UserService.isLoggedIn &&
        UserService.getPermissionToken()
      )
    ) {
      if (!updatingGeneralToken) {
        // if token is not fetching, fetch it! Then execute the pending queue.
        console.log('Update general token');
        updatingGeneralToken = true;
        UserService.updateToken(() => {
          updatingGeneralToken = false;
          onGeneralTokenFetched(UserService.getPermissionToken());
        });
      }
      // Add the request to pending queue because we don't have token!
      return new Promise((resolve) => {
        addPendingGeneralRequest((access_token) => {
          resolve(
            request({
              ...config,
              headers: {
                ...config.headers,
                Authorization: 'Bearer ' + access_token,
              },
            })
          );
        });
      });
    }
    return request({
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${UserService.getPermissionToken()}`,
      },
    });
  } else {
    if (
      !(
        UserService &&
        UserService.isLoggedIn &&
        UserService.getProjectToken(scope)
      )
    ) {
      if (!updatingProjectToken) {
        // if token is not fetching, fetch it! Then execute the pending queue.
        console.log('Update project token');
        updatingProjectToken = true;
        UserService.updateProjectToken(scope, () => {
          updatingProjectToken = false;
          onProjectTokenFetched(UserService.getProjectToken(scope));
        });
      }
      // Add the request to pending queue because we don't have token!
      return new Promise((resolve) => {
        addPendingProjectRequest((access_token) => {
          resolve(
            request({
              ...config,
              headers: {
                ...config.headers,
                Authorization: 'Bearer ' + access_token,
              },
            })
          );
        });
      });
    }
    return request({
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${UserService.getProjectToken(scope)}`,
      },
    });
  }
};

request.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

request.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const originalRequest = error.config;
    const errorCode = get(error, 'response.status');
    if ((errorCode === 401 || errorCode === 403) && !originalRequest._retry) {
      // if call fail the first time, try to get another token, add the request to queue and execute it when token is ready

      const scope = originalRequest.scope;
      originalRequest._retry = true;

      if (scope === 'global') {
        if (!updatingGeneralToken) {
          updatingGeneralToken = true;
          UserService.updateToken(() => {
            updatingGeneralToken = false;
            onGeneralTokenFetched(UserService.getPermissionToken());
          });
        }
        return new Promise((resolve) => {
          addPendingGeneralRequest((access_token) => {
            originalRequest.headers.Authorization = 'Bearer ' + access_token;
            resolve(request(originalRequest));
          });
        });
      } else {
        if (!updatingProjectToken) {
          updatingProjectToken = true;
          UserService.updateProjectToken(scope, () => {
            updatingProjectToken = false;
            onProjectTokenFetched(UserService.getProjectToken(scope));
          });
        }
        return new Promise((resolve) => {
          addPendingProjectRequest((access_token) => {
            originalRequest.headers.Authorization = 'Bearer ' + access_token;
            resolve(request(originalRequest));
          });
        });
      }
    } else {
      if (errorCode === 401) {
        actionLogout();
      } else if (errorCode === 403) {
        cookie.remove(PROJECT_TOKEN);
        cookie.remove(TOKEN);
        window.location.href = '/no-permission';
      } else {
        return Promise.reject(error);
      }
    }
  }
);

export default api;
