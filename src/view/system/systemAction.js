import api from "../../utils/service/api";
import get from "lodash/get";
import axios from "axios";
import * as actionType from "../../utils/constants/actions";

import {
  CONFIG_SERVER,
  TOKEN,
  REFRESH_TOKEN,
  REALM_ID,
  VINLAB_LOCALE,
  // OIDC_SETTINGS,
} from "../../utils/constants/config";
import cookie from "js-cookie";

const {
  CLIENT_ID,
  RESPONSE_TYPE,
  STATE,
  AUDIENCE,
  REACT_APP_BACKEND_URL,
  REACT_APP_AUTH_URL,
} = CONFIG_SERVER;

export const getAuthUrl = () => {
  const realmId = localStorage.getItem(REALM_ID);
  const url =
    REACT_APP_AUTH_URL +
    `/auth/realms/${realmId}/protocol/openid-connect/token`;

  return url;
};

export const requestLogin = (isRedirect) => {
  const realmId = localStorage.getItem(REALM_ID);
  const pathAuth =
    REACT_APP_AUTH_URL + `/auth/realms/${realmId}/protocol/openid-connect/auth`;

  let loginUrl =
    pathAuth +
    "?client_id=" +
    CLIENT_ID +
    "&response_type=" +
    RESPONSE_TYPE +
    "&state=" +
    STATE;

  if (isRedirect) {
    loginUrl += "&redirect_uri=" + window.location.origin;
    sessionStorage.setItem("redirect_uri", window.location.href);
  }

  window.location.href = encodeURI(loginUrl);
};

export const actionRefreshToken = (refreshToken = "") => {
  let requestBody = new URLSearchParams();
  requestBody.append("grant_type", "refresh_token");
  requestBody.append("client_id", CLIENT_ID);
  requestBody.append("refresh_token", refreshToken);
  requestBody.append("redirect_uri", window.location.origin);
  const realmId = localStorage.getItem(REALM_ID);

  return api(
    {
      method: "post",
      url:
        REACT_APP_AUTH_URL +
        `/auth/realms/${realmId}/protocol/openid-connect/token`,
      data: requestBody,
    },
    true
  );
};

export const actionGetPermissionToken = async (token) => {
  try {
    let requestBody = new URLSearchParams();
    requestBody.append(
      "grant_type",
      "urn:ietf:params:oauth:grant-type:uma-ticket"
    );
    requestBody.append("audience", AUDIENCE);
    requestBody.append("permission", ['api_key#all', 'usage#all']);

    const res = await api(
      {
        url: getAuthUrl(),
        method: "post",
        data: requestBody,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      true
    );

    if (res && res.data && res.data.access_token) {
      const { data } = res;
      window.location.href =
        sessionStorage.getItem("redirect_uri") || window.location.hostname;
      cookie.set(TOKEN, data.access_token, {
        expires: new Date((res.data.expires_in || 1800) * 1000 + Date.now()),
      });
      cookie.set(REFRESH_TOKEN, data.refresh_token, {
        expires: new Date(
          (res.data.refresh_expires_in || 1800) * 1000 + Date.now()
        ),
      });
      getAccountInfo();
      return res;
    }
  } catch (error) {
    console.log(error);
  }
};

export const actionGetToken = (code = "", sessionState = "") => {
  let requestBody = new URLSearchParams();
  requestBody.append("grant_type", "authorization_code");
  requestBody.append("client_id", CLIENT_ID);
  requestBody.append("code", code);
  requestBody.append("session_state", sessionState);
  requestBody.append("redirect_uri", window.location.origin);

  return api(
    {
      method: "post",
      url: getAuthUrl(),
      data: requestBody,
    },
    true
  );
};

export const actionGetTenantSetting = async () => {
  const res = await axios({
    method: "GET",
    url: REACT_APP_BACKEND_URL + "/settings",
  });

  // if (res && res.data && res.data.realm_id) {
  //   localStorage.setItem(REALM_ID, res.data.realm_id);
  // }
  localStorage.setItem(REALM_ID, CONFIG_SERVER.REALM_ID);

  return res;
};

export const getAccountInfo = () => {
  window.store.dispatch(actionShowLoading());

  const url = REACT_APP_BACKEND_URL + '/user/userinfo'
  return api({
    url: url,
    method: "GET",
  }).then((result) => {
    window.store.dispatch(actionHideLoading());
    const data = get(result, 'data.data');
    window.store.dispatch({ type: actionType.FETCHING_PROFILE, payload: data });
  });
};

export const actionLogout = async () => {
  try {
    const realmId = localStorage.getItem(REALM_ID);

    const url =
      REACT_APP_AUTH_URL +
      `/auth/realms/${realmId}/protocol/openid-connect/logout?redirect_uri=${window.origin}`;

    cookie.remove(REFRESH_TOKEN);
    cookie.remove(TOKEN);
    localStorage.removeItem(REALM_ID);
    window.location.href = url;
  } catch (error) {}
};

export const actionShowLoading = () => ({ type: actionType.SHOW_LOADING });

export const actionHideLoading = () => ({ type: actionType.HIDE_LOADING });

export const actionChangeLanguage = (lang) => {
  cookie.set(VINLAB_LOCALE, lang);
  return {
    type: actionType.CHANGE_LANGUAGE,
    payload: lang,
  };
};
