import get from 'lodash/get';
import api from '../../system/api';
import { API_ENV, MODEL_STATUS } from '../../../utils/constants/config';

const organization = 'cad';

export const serviceGrantAPIKey = async ({ project_id, payload }) => {
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

export const serviceGenerateAPIKey = async ({ project_id, payload }) => {
  const url = `/api-key-v2/g/${organization}/${project_id}/generate`;
  try {
    const res = await api(
      { url, method: 'POST', data: payload },
      API_ENV.KEY,
      project_id
    );
    const data = get(res, 'data');
    return data;
  } catch (error) {}
};

export const serviceRegenerateAPIKey = async ({ project_id, payload }) => {
  const url = `/api-key-v2/g/${organization}/${project_id}/regenerate/${payload.id}`;
  try {
    const res = await api({ url, method: 'PUT' }, API_ENV.KEY, project_id);
    const data = get(res, 'data');
    return data;
  } catch (error) {}
};

export const serviceUpdateCredential = async ({ project_id, payload }) => {
  const url = `/api-key-v2/g/${organization}/${project_id}/update/${payload.id}`;
  try {
    const res = await api(
      { url, method: 'PUT', data: payload },
      API_ENV.KEY,
      project_id
    );
    const data = get(res, 'data');
    return data;
  } catch (error) {}
};

export const serviceDeleteCredential = ({ project_id, payload }) => {
  const url = `/api-key-v2/g/${organization}/${project_id}/key/${payload.id}`;
  try {
    return api({ url, method: 'DELETE' }, API_ENV.KEY, project_id);
  } catch (error) {}
};

export const serviceRevokeCredential = ({ project_id, payload }) => {
  const url = `/api-key-v2/g/${organization}/${project_id}/revoke/${payload.id}`;
  try {
    return api({ url, method: 'POST' }, API_ENV.KEY, project_id);
  } catch (error) {}
};

export const serviceGetResourceList = (params) => {
  const projectId = params.project_id;
  const url = `/project-resource/g/${organization}/${projectId}/list`;
  return api(
    { url, method: 'GET', params: { status: MODEL_STATUS.ON } },
    API_ENV.RESOURCE,
    projectId
  );
};

export const serviceGetCredentialList = async (project_id) => {
  const url = `/api-key-v2/g/${organization}/${project_id}/list`;
  try {
    const res = await api(
      { url, method: 'GET', params: { project_id: project_id } },
      API_ENV.KEY,
      project_id
    );
    const data = get(res, 'data.data');
    return data;
  } catch (error) {}
};
