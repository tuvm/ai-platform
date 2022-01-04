import api from './api';
import get from 'lodash/get';
import axios from 'axios';
import * as actionType from '../../utils/constants/actions';
import { Ticket } from '../../utils/permission/ticket';
// import { GlobalRouteState } from '../../utils/globals';

import {
  CONFIG_SERVER,
  TOKEN,
  REFRESH_TOKEN,
  LOCAL_STORAGE_REALM_ID,
  AI_PLATFORM_LOCALE,
  API_ENV,
  // OIDC_SETTINGS,
} from '../../utils/constants/config';
import cookie from 'js-cookie';

const { CLIENT_ID, RESPONSE_TYPE, STATE, AUDIENCE, REACT_APP_AUTH_URL } =
  CONFIG_SERVER;

export const getAuthUrl = () => {
  const realmId = localStorage.getItem(LOCAL_STORAGE_REALM_ID);
  const url =
    REACT_APP_AUTH_URL +
    `/auth/realms/${realmId}/protocol/openid-connect/token`;

  return url;
};

export const requestLogin = (isRedirect) => {
  const realmId = localStorage.getItem(LOCAL_STORAGE_REALM_ID);
  const pathAuth =
    REACT_APP_AUTH_URL + `/auth/realms/${realmId}/protocol/openid-connect/auth`;

  let loginUrl =
    pathAuth +
    '?client_id=' +
    CLIENT_ID +
    '&response_type=' +
    RESPONSE_TYPE +
    '&state=' +
    STATE;

  if (isRedirect) {
    loginUrl += '&redirect_uri=' + window.location.origin;
    sessionStorage.setItem('redirect_uri', window.location.href);
  }

  window.location.href = encodeURI(loginUrl);
};

export const actionRefreshToken = (refreshToken = '') => {
  let requestBody = new URLSearchParams();
  requestBody.append('grant_type', 'refresh_token');
  requestBody.append('client_id', CLIENT_ID);
  requestBody.append('refresh_token', refreshToken);
  requestBody.append('redirect_uri', window.location.origin);
  const realmId = localStorage.getItem(LOCAL_STORAGE_REALM_ID);

  return api(
    {
      method: 'post',
      url: `/auth/realms/${realmId}/protocol/openid-connect/token`,
      data: requestBody,
    },
    API_ENV.AUTH
  );
};

export const actionGetPermissionToken = async (token) => {
  try {
    let requestBody = new URLSearchParams();
    requestBody.append(
      'grant_type',
      'urn:ietf:params:oauth:grant-type:uma-ticket'
    );
    requestBody.append('audience', AUDIENCE);
    // requestBody.append('permission', '#project.org.get');

    // const projectId = GlobalRouteState.projectId;
    // const org = GlobalRouteState.organization;
    // if(projectId){
    //   requestBody.append('permission', `${GlobalRouteState.org}/${GlobalRouteState.projectId}`);
    // }

    // const location = window.location;
    // const match = matchPath(location, {
    //   path: '/projects/:projectId/:page',
    //   exact: true,
    //   strict: false
    // });
    // const projectId = get(match, 'params.projectId');
    // console.log({projectId})

    // requestBody.append('permission', '#project.org.get');
    // requestBody.append('permission', 'cad/pending3-l9at');
    // requestBody.append('permission', 'api_key#all');
    // requestBody.append('permission', 'usage#all');

    const res = await api(
      {
        url: getAuthUrl(),
        method: 'post',
        data: requestBody,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      API_ENV.AUTH
    );

    if (res && res.data && res.data.access_token) {
      const { data } = res;
      // console.log({ data: data.access_token });
      cookie.set(TOKEN, data.access_token, {
        expires: new Date((res.data.expires_in || 1800) * 1000 + Date.now()),
      });
      cookie.set(REFRESH_TOKEN, data.refresh_token, {
        expires: new Date(
          (res.data.refresh_expires_in || 1800) * 1000 + Date.now()
        ),
      });
      getAccountInfo();
      window.location.href =
        sessionStorage.getItem('redirect_uri') || window.location.hostname;
      return res;
    }
  } catch (error) {
    debugger;
    console.log({ error });
  }
};

export const actionGetToken = (code = '', sessionState = '') => {
  let requestBody = new URLSearchParams();
  requestBody.append('grant_type', 'authorization_code');
  requestBody.append('client_id', CLIENT_ID);
  requestBody.append('code', code);
  requestBody.append('session_state', sessionState);
  requestBody.append('redirect_uri', window.location.origin);

  return api(
    {
      method: 'post',
      url: getAuthUrl(),
      data: requestBody,
    },
    API_ENV.AUTH
  );
};

export const actionGetTenantSetting = async () => {
  const res = await axios({
    method: 'GET',
    url: API_ENV.CONSOLE + '/settings',
  });

  // if (res && res.data && res.data.realm_id) {
  //   localStorage.setItem(LOCAL_STORAGE_REALM_ID, res.data.realm_id);
  // }
  localStorage.setItem(LOCAL_STORAGE_REALM_ID, CONFIG_SERVER.REALM_ID);

  return res;
};

export const getAccountInfo = () => {
  window.store.dispatch(actionShowLoading());

  return api(
    {
      url: '/user/userinfo',
      method: 'GET',
    },
    API_ENV.CONSOLE
  ).then((result) => {
    window.store.dispatch(actionHideLoading());
    const data = get(result, 'data.data');
    window.store.dispatch({ type: actionType.FETCHING_PROFILE, payload: data });
  });
};

export const actionChangePassword = (data) => {
  const realmId = localStorage.getItem(LOCAL_STORAGE_REALM_ID);
  return api(
    {
      url: `/auth/realms/${realmId}/account/credentials/password`,
      method: 'POST',
      data: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    },
    API_ENV.AUTH
  );
};

export const actionLogout = async () => {
  try {
    const realmId = localStorage.getItem(LOCAL_STORAGE_REALM_ID);

    const url =
      REACT_APP_AUTH_URL +
      `/auth/realms/${realmId}/protocol/openid-connect/logout?redirect_uri=${window.origin}`;

    cookie.remove(REFRESH_TOKEN);
    cookie.remove(TOKEN);
    // localStorage.removeItem(LOCAL_STORAGE_REALM_ID);
    window.location.href = url;
  } catch (error) {}
};

export const actionShowLoading = () => ({ type: actionType.SHOW_LOADING });

export const actionHideLoading = () => ({ type: actionType.HIDE_LOADING });

export const actionChangeLanguage = (lang) => {
  cookie.set(AI_PLATFORM_LOCALE, lang);
  return {
    type: actionType.CHANGE_LANGUAGE,
    payload: lang,
  };
};

export const actionInspectTicket =
  ({ scope }) =>
  async (dispatch) => {
    const url = '/tickets/inspect';
    dispatch({
      type: actionType.FETCH_TICKET,
    });
    try {
      let data;
      if (scope === 'global') {
        data = await api(
          {
            url,
            method: 'GET',
          },
          API_ENV.CONSOLE,
          scope
        );
      } else {
        data = await api(
          {
            url,
            method: 'GET',
            params: { project_id: scope },
          },
          API_ENV.CONSOLE,
          scope
        );
      }
      const payload = get(data, 'data.data.0.perms') || [];
      const resource = get(data, 'data.data.0.resource') || 'cad';
      dispatch({
        type: actionType.FETCH_TICKET_SUCCESS,
        payload: { [resource]: new Ticket(payload, 'cad') },
      });
      return payload;
    } catch (error) {
      console.log(error);
      dispatch({
        type: actionType.FETCH_TICKET_ERROR,
        payload: error,
      });
    }
  };
