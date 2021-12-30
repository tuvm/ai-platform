import get from 'lodash/get';
import api from '../../system/api';
import * as actions from '../../../utils/constants/actions';
import { API_ENV } from '../../../utils/constants/config';

const organization = 'cad';

export const actionGrantAPIKey = async ({ payload }) => {
  const url = '/resource-access/grant';
  try {
    const res = await api(
      { url, method: 'POST', data: payload },
      API_ENV.RESOURCE,
      payload.project_id
    );
    const data = get(res, 'data');
    return data;
  } catch (error) {}
};

export const actionGenerateAPIKey = async ({ payload }) => {
  const url = '/api-key-v2/generate';
  try {
    const res = await api({ url, method: 'POST', data: payload }, API_ENV.KEY);
    const data = get(res, 'data');
    return data;
  } catch (error) {}
};

export const actionRegenerateAPIKey = async ({ payload }) => {
  const url = `/api-key-v2/regenerate/${payload.id}`;
  try {
    const res = await api({ url, method: 'PUT' }, API_ENV.KEY);
    const data = get(res, 'data');
    return data;
  } catch (error) {}
};

export const actionUpdateCredential = async ({ payload }) => {
  const url = `/api-key-v2/update/${payload.id}`;
  try {
    const res = await api({ url, method: 'PUT', data: payload }, API_ENV.KEY);
    const data = get(res, 'data');
    return data;
  } catch (error) {}
};

export const actionDeleteCredential = ({ payload }) => {
  const url = `/api-key-v2/${payload.id}`;
  try {
    return api({ url, method: 'DELETE' }, API_ENV.KEY);
  } catch (error) {}
};

export const actionRevokeCredential = ({ payload }) => {
  const url = `/api-key-v2/revoke/${payload.id}`;
  try {
    return api({ url, method: 'POST' }, API_ENV.KEY);
  } catch (error) {}
};

export const actionGetResourceList =
  ({ params }) =>
  async (dispatch) => {
    const projectId = params.project_id;
    const url = `/project-resource/g/${organization}/${projectId}/list`;
    dispatch({ type: actions.FETCH_RESOURCE });
    try {
      const res = await api(
        { url, method: 'GET', params: {status: "on"}}, 
        API_ENV.RESOURCE,
        projectId,
      );
      const data = get(res, 'data');
      dispatch({ type: actions.FETCH_RESOURCE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: actions.FETCH_RESOURCE_ERROR });
    }
  };

export const actionGetCredentialList = async ({ params }) => {
  const url = '/api-key-v2/list';
  try {
    const res = await api({ url, method: 'GET', params }, API_ENV.KEY);
    const data = get(res, 'data.data');
    return data;
  } catch (error) {}
};
