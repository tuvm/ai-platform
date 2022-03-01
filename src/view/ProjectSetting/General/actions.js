import get from 'lodash/get';
import api from '../../system/api';
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

export const actionChangeSubcription = async ({ project_id, type }) => {
  const url = `/projects/g/${organization}/${project_id}/subcription`;
  try {
    const res = await api(
      { url, method: 'POST', data: {"type": type} },
      API_ENV.CONSOLE,
      project_id,
    );
    const data = get(res, 'data');
    return data;
  } catch (error) {
    return getError({ error });
  }
};