import get from 'lodash/get';
import api from '../../system/api';
import * as actions from '../../../utils/constants/actions';
import { API_ENV } from '../../../utils/constants/config';

const organization = 'cad';

export const actionGrantAPIKey = async ({ project_id, payload }) => {
  const url = `/resource-access/g/${organization}/${project_id}/grant`;
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

export const actionGenerateAPIKey = async ({ project_id, payload }) => {
  const url = `/api-key-v2/g/${organization}/${project_id}/generate`;
  try {
    const res = await api(
      { url, method: 'POST', data: payload }, 
      API_ENV.KEY,
      project_id,
      );
    const data = get(res, 'data');
    return data;
  } catch (error) {}
};

export const actionRegenerateAPIKey = async ({ project_id, payload }) => {
  const url = `/api-key-v2/g/${organization}/${project_id}/regenerate/${payload.id}`;
  try {
    const res = await api(
      { url, method: 'PUT' }, 
      API_ENV.KEY,
      project_id,);
    const data = get(res, 'data');
    return data;
  } catch (error) {}
};

export const actionUpdateCredential = async ({ project_id, payload }) => {
  const url = `/api-key-v2/g/${organization}/${project_id}/update/${payload.id}`;
  try {
    const res = await api(
      { url, method: 'PUT', data: payload }, 
      API_ENV.KEY,
      project_id,);
    const data = get(res, 'data');
    return data;
  } catch (error) {}
};

export const actionDeleteCredential = ({ project_id, payload }) => {
  const url = `/api-key-v2/g/${organization}/${project_id}/key/${payload.id}`;
  try {
    return api(
      { url, method: 'DELETE' }, 
      API_ENV.KEY,
      project_id,);
  } catch (error) {}
};

export const actionRevokeCredential = ({ project_id, payload }) => {
  const url = `/api-key-v2/g/${organization}/${project_id}/revoke/${payload.id}`;
  try {
    return api(
      { url, method: 'POST' }, 
      API_ENV.KEY,
      project_id,);
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
  const project_id = params.project_id;
  const url = `/api-key-v2/g/${organization}/${project_id}/list`;
  try {
    const res = await api(
      { url, method: 'GET', params }, 
      API_ENV.KEY,
      project_id,);
    const data = get(res, 'data.data');
    return data;
  } catch (error) {}
};
