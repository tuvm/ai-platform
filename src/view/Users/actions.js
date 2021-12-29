// import get from 'lodash/get';
// import api from '../../utils/service/api';
import * as actions from '../../utils/constants/actions';
// import { API_ENV } from '../../utils/constants/config';

// const organization = 'cad';

export const actionGetUserList = () => {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve({
        data: [
          {
            acr: '1',
            aud: 'cad-api',
            auth_time: 1640249155,
            azp: 'console-ui',
            email: 'tu.vm41@gmail.com',
            email_verified: false,
            exp: 1640249459,
            iat: 1640249159,
            iss: 'http://localhost:8088/auth/realms/cad',
            jti: '3abb52c4-f44b-4f56-8e47-d46945e27aa2',
            preferred_username: 'tuvm1',
            realm_access: { roles: ['offline_access', 'uma_authorization'] },
            resource_access: {
              account: { roles: ['manage-account', 'view-profile'] },
            },
            scope: 'email profile',
            session_state: '21fd272a-ddb7-4b96-8831-fc0de54851c8',
            sub: '1e0b50d5-dad2-4503-9a13-7745b3225f1c',
            typ: 'Bearer',
          },
          {
            acr: '1',
            aud: 'cad-api',
            auth_time: 1640249155,
            azp: 'console-ui',
            email: 'tu.vm41@gmail.com',
            email_verified: false,
            exp: 1640249459,
            iat: 1640249159,
            iss: 'http://localhost:8088/auth/realms/cad',
            jti: '3abb52c4-f44b-4f56-8e47-d46945e27aa2',
            preferred_username: 'tuvm2',
            realm_access: { roles: ['offline_access', 'uma_authorization'] },
            resource_access: {
              account: { roles: ['manage-account', 'view-profile'] },
            },
            scope: 'email profile',
            session_state: '21fd272a-ddb7-4b96-8831-fc0de54851c8',
            sub: '1e0b50d5-dad2-4503-9a13-7745b3225f1c',
            typ: 'Bearer',
          },
          {
            acr: '1',
            aud: 'cad-api',
            auth_time: 1640249155,
            azp: 'console-ui',
            email: 'tu.vm41@gmail.com',
            email_verified: false,
            exp: 1640249459,
            iat: 1640249159,
            iss: 'http://localhost:8088/auth/realms/cad',
            jti: '3abb52c4-f44b-4f56-8e47-d46945e27aa2',
            preferred_username: 'tuvm3',
            realm_access: { roles: ['offline_access', 'uma_authorization'] },
            resource_access: {
              account: { roles: ['manage-account', 'view-profile'] },
            },
            scope: 'email profile',
            session_state: '21fd272a-ddb7-4b96-8831-fc0de54851c8',
            sub: '1e0b50d5-dad2-4503-9a13-7745b3225f1c',
            typ: 'Bearer',
          },
        ],
        count: 3,
      });
    }, 200)
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
