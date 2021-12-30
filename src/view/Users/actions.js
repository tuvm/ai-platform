import * as actions from '../../utils/constants/actions';
import { API_ENV } from '../../utils/constants/config';
import api from '../system/api';

const organization = 'cad';

export const actionUpdateUser = (userId, params) => {
  return api(
    { url: `/user/userinfo/${userId}`, data: params, method: 'PUT' },
    API_ENV.CONSOLE
  );
};

export const actionGetUserList = () => {
  return api(
    {
      url: `/org-members/${organization}/members`,
      method: 'GET',
    },
    API_ENV.CONSOLE
  );
};

export const fetchUserList = () => {
  return {
    type: actions.FETCH_USER_LIST,
  };
};

export const fetchUserListSuccess = (data) => {
  return {
    type: actions.FETCH_USER_LIST_SUCCESS,
    payload: data,
  };
};

export const fetchUserListError = (error) => {
  return {
    type: actions.FETCH_USER_LIST_ERROR,
    payload: error,
  };
};
