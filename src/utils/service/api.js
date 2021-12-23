import axios from 'axios';
import Qs from 'qs';
import get from 'lodash/get';
import {
  TOKEN,
  REFRESH_TOKEN,
  LOCAL_STORAGE_REALM_ID,
  API_ENV,
} from '../constants/config';
import {
  actionGetPermissionToken,
  actionGetTenantSetting,
  actionGetToken,
  actionLogout,
  actionRefreshToken,
  requestLogin,
} from '../../view/system/systemAction';
import cookie from 'js-cookie';

const request = axios.create();

const getToken = async (code, sessionState) => {
  try {
    const res = await actionGetToken(code, sessionState);
    if (res && res.data && res.data.access_token) {
      actionGetPermissionToken(res.data.access_token);
    }
  } catch (error) {
    console.log(error);
  }
};

async function callRefreshToken(refreshToken) {
  try {
    const res = await actionRefreshToken(refreshToken);

    if (res && res.data && res.data.access_token) {
      const accessToken = res.data.access_token;
      cookie.remove(TOKEN);
      actionGetPermissionToken(accessToken);
    }
  } catch (error) {
    actionLogout();
  }
}

const checkAuthorizationFlow = async () => {
  let reamId = localStorage.getItem(LOCAL_STORAGE_REALM_ID);

  if (!reamId) {
    const res = await actionGetTenantSetting();
    if (res && res.data && res.data.realm_id) {
      reamId = res.data.realm_id;
    }
  }

  if (reamId) {
    authorization();
  }
};

const authorization = () => {
  const refreshToken = cookie.get(REFRESH_TOKEN);

  // no refresh token
  if (!refreshToken) {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const sessionState = urlParams.get('session_state');
    // console.log({code, sessionState})
    if (code) {
      getToken(code, sessionState);
    } else {
      requestLogin(true);
    }
  } else {
    callRefreshToken(refreshToken);
  }
};

const api = (options = {}, apiEnv = API_ENV.BACKEND) => {
  let config = {
    baseURL: apiEnv,
    ...options,
    paramsSerializer: (params) =>
      Qs.stringify(params, { arrayFormat: 'repeat' }),
    headers: {
      Accept: '*/*',
      ...options.headers,
    },
  };
  console.log(`api token ${cookie.get(TOKEN)}`);
  console.log(`api token cookie ${JSON.stringify(cookie.cookieData)}`);
  if (cookie.get(TOKEN) && cookie.get(REFRESH_TOKEN)) {
    config.headers.Authorization = `Bearer ${cookie.get(TOKEN)}`;
  }
  return request(config);
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
    console.log({ error });
    const errorCode = get(error, 'response.status');
    if (errorCode === 401 || errorCode === 403) {
      checkAuthorizationFlow();
    } else {
      return Promise.reject(error);
    }

    // return Promise.reject(error);
  }
);

export default api;
