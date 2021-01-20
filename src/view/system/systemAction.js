import cookie from 'js-cookie';
import api from '../../utils/service/api';
import * as actionType from '../../utils/constants/actions';
import {
  CONFIG_SERVER,
  routes,
  REFRESH_TOKEN,
  TOKEN,
  BASE_FE_PREFIX,
  VINLAB_LOCALE,
  USER_ROLES,
  FIRST_REFRESH_TOKEN,
} from '../../utils/constants/config';

const {
  CLIENT_ID,
  REDIRECT_URI,
  OIDC_LOGOUT_URI,
  OIDC_USERINFO_ENDPOINT,
  AUTH_URL,
  OIDC_ACCESS_TOKEN_URI,
  RESPONSE_TYPE,
  STATE,
  OIDC_AUTHORIZATION_URI,
  SCOPE,
  AUDIENCE,
  TOKEN_PERMISSION,
} = CONFIG_SERVER;

export const actionChangeLanguage = (lang) => {
  cookie.set(VINLAB_LOCALE, lang);
  return {
    type: actionType.CHANGE_LANGUAGE,
    payload: lang,
  };
};
export const actionShowLoading = () => ({ type: actionType.SHOW_LOADING });

export const actionHideLoading = () => ({ type: actionType.HIDE_LOADING });

export const getAccountInfo = () => async (dispatch) => {
  try {
    dispatch(actionShowLoading());
    const { data } = await api({
      method: 'get',
      // baseURL: CONFIG_SERVER.AUTH_URL,
      url:
        OIDC_USERINFO_ENDPOINT ||
        AUTH_URL + '/auth/realms/vinlab/protocol/openid-connect/userinfo',
    });

    dispatch({ type: actionType.FETCHING_PROFILE, payload: data });

    let isValidPage = false;
    const pathname = window.location.pathname || '';
    Object.keys(routes).forEach((key) => {
      if (!isValidPage && pathname.indexOf(routes[key]) > -1) {
        isValidPage = true;
      }
    });

    if (!isValidPage) {
      window.location.replace(BASE_FE_PREFIX + routes.PROJECTS);
    }

    dispatch(actionHideLoading());
  } catch (error) {
    console.log(error);
    dispatch(actionHideLoading());
    actionLogout();
  }
};

export const actionGetToken = (code = '') => {
  let requestBody = new URLSearchParams();
  requestBody.append('grant_type', 'authorization_code');
  requestBody.append('client_id', CLIENT_ID);
  requestBody.append('code', code);
  requestBody.append('redirect_uri', REDIRECT_URI);

  return api({
    method: 'post',
    // baseURL: CONFIG_SERVER.AUTH_URL,
    url:
      OIDC_ACCESS_TOKEN_URI ||
      AUTH_URL + '/auth/realms/vinlab/protocol/openid-connect/token',
    data: requestBody,
  });
};

export const actionGetPermissionToken = (token, listPermission) => {
  let requestBody = new URLSearchParams();
  requestBody.append(
    'grant_type',
    'urn:ietf:params:oauth:grant-type:uma-ticket'
  );
  requestBody.append('audience', AUDIENCE);

  (listPermission || TOKEN_PERMISSION).forEach((it) => {
    requestBody.append('permission', it);
  });

  return api({
    method: 'post',
    url:
      OIDC_ACCESS_TOKEN_URI ||
      AUTH_URL + '/auth/realms/vinlab/protocol/openid-connect/token',
    data: requestBody,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const actionRefreshToken = (refreshToken = '') => {
  let requestBody = new URLSearchParams();
  requestBody.append('grant_type', 'refresh_token');
  requestBody.append('client_id', CLIENT_ID);
  requestBody.append('refresh_token', refreshToken);
  requestBody.append('redirect_uri', REDIRECT_URI);

  return api({
    method: 'post',
    // baseURL: CONFIG_SERVER.AUTH_URL,
    url:
      OIDC_ACCESS_TOKEN_URI ||
      AUTH_URL + '/auth/realms/vinlab/protocol/openid-connect/token',
    data: requestBody,
  });
};

export const requestLogin = () => {
  const pathAuth =
    OIDC_AUTHORIZATION_URI ||
    AUTH_URL + '/auth/realms/vinlab/protocol/openid-connect/auth';
  let loginUrl =
    pathAuth +
    '?client_id=' +
    CLIENT_ID +
    '&response_type=' +
    RESPONSE_TYPE +
    '&state=' +
    STATE +
    '&scope=' +
    SCOPE +
    '&redirect_uri=' +
    REDIRECT_URI;

  window.location.href = encodeURI(loginUrl);
};

export const actionLogout = async () => {
  try {
    if (cookie.get(REFRESH_TOKEN) || cookie.get(FIRST_REFRESH_TOKEN)) {
      let requestBody = new URLSearchParams();
      requestBody.append('client_id', CLIENT_ID);
      requestBody.append('redirect_uri', REDIRECT_URI);
      requestBody.append(
        'refresh_token',
        cookie.get(REFRESH_TOKEN) || cookie.get(FIRST_REFRESH_TOKEN)
      );
      await api({
        method: 'post',
        url:
          OIDC_LOGOUT_URI ||
          AUTH_URL + '/auth/realms/vinlab/protocol/openid-connect/logout',
        data: requestBody,
      });
    }
    cookie.remove(TOKEN);
    cookie.remove(REFRESH_TOKEN);
    requestLogin();
  } catch (error) {
    cookie.remove(TOKEN);
    cookie.remove(REFRESH_TOKEN);
    requestLogin();
  }
};

export const checkRole = (profile, role = '') => {
  if (!profile || !role) return false;
  const { realm_roles = [] } = profile;
  return realm_roles.indexOf(role) > -1;
};

export const isProjectOwner = (projectInfo, userInfo) => {
  if (!projectInfo || !userInfo) return false;
  const { people = [] } = projectInfo;
  const listPO = people.filter(
    (it) =>
      it.id === userInfo.sub &&
      (it?.roles || []).indexOf(USER_ROLES.PROJECT_OWNER) > -1
  );
  return (listPO || []).length > 0;
};

export const actionGetUsers = (params = {}) => async (dispatch) => {
  try {
    dispatch({ type: actionType.FETCHING_USERS, payload: true });
    const { data } = await api({
      method: 'get',
      url: '/api/accounts/userinfo',
      params,
    });
    dispatch({ type: actionType.FETCH_USERS, payload: data });
  } catch (error) {
    dispatch({ type: actionType.FETCHING_USERS, payload: false });
  }
};

export const actionGetListPermission = (token = '') => {
  return api({
    method: 'get',
    url: '/api/accounts/permissions',
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const actionShowUploadModal = (uploadInfo = {}) => {
  return {
    type: actionType.SHOW_UPLOAD_MODAL,
    payload: uploadInfo,
  };
};
