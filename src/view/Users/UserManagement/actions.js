import get from 'lodash/get';
import api from '../../system/api';
// import * as actions from '../../../utils/constants/actions';
import { API_ENV } from '../../../utils/constants/config';

const organization = 'cad';

const getError = ({ error }) => {
  return { error: get(error, 'response.data.detail') };
};

export const apiError = (response) => {
  const e = get(response, 'error');
  if (e == null || e === undefined) {
    return false;
  }
  return e;
};

export const actionAddOrgMember = async ({ payload }) => {
  const url = `/org-members/${organization}/members`;
  try {
    const res = await api(
      { url, method: 'POST', data: payload },
      API_ENV.CONSOLE
    );
    const data = get(res, 'data');
    return data;
  } catch (error) {
    return getError({ error });
  }
};

export const actionListOrgMember = async () => {
  const url = `/org-members/${organization}/members`;
  try {
    const res = await api({ url, method: 'GET' }, API_ENV.CONSOLE);
    const data = get(res, 'data');
    return data;
  } catch (error) {
    return getError({ error });
  }
};

export const actionDeleteOrgMember = async ({ member_id }) => {
  const url = `/org-members/${organization}/member/${member_id}`;
  try {
    const res = await api({ url, method: 'DELETE' }, API_ENV.CONSOLE);
    const data = get(res, 'data');
    return data;
  } catch (error) {
    return getError({ error });
  }
};

export const actionEditOrgMember = async ({ member_id, payload }) => {
  const url = `/org-members/${organization}/member/${member_id}`;
  try {
    const res = await api(
      { url, method: 'PUT', data: payload },
      API_ENV.CONSOLE
    );
    const data = get(res, 'data');
    return data;
  } catch (error) {
    return getError({ error });
  }
};
