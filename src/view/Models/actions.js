import * as actions from '../../utils/constants/actions';
import { API_ENV } from '../../utils/constants/config';
import api from '../system/api';

const organization = 'cad';

export const getRule = (projectId, model, key) => {
  return api(
    {
      url: `/rules?resource_slug=${model}`,
      method: 'GET',
      headers: { 'X-API-KEY': key },
    },
    API_ENV.AUTO_DIAGNOSE,
    projectId
  );
};

export const createRule = (projectId, model, rule, key) => {
  return api(
    {
      url: `/rules`,
      method: 'POST',
      headers: { 'X-API-KEY': key },
      data: {
        resource_slug: model,
        rules: rule,
      },
    },
    API_ENV.AUTO_DIAGNOSE,
    projectId
  );
};

export const updateRule = (projectId, model, ruleId, rule, key) => {
  return api(
    {
      url: `/rules/${ruleId}`,
      method: 'PUT',
      headers: { 'X-API-KEY': key },
      data: {
        resource_slug: model,
        rules: rule,
      },
    },
    API_ENV.AUTO_DIAGNOSE,
    projectId
  );
};

export const getModelSetting = (projectId, model) => {
  return api(
    {
      url: `/modules/g/${organization}/${projectId}/config/${model}`,
      method: 'GET',
    },
    API_ENV.DIAGNOSE,
    projectId
  );
};

export const updateModelSetting = (projectId, model, config) => {
  return api(
    {
      url: `/modules/g/${organization}/${projectId}/config/${model}`,
      method: 'PUT',
      data: config,
    },
    API_ENV.DIAGNOSE,
    projectId
  );
};

export const getModellist = (projectId) => async (dispatch) => {
  try {
    dispatch(fetchModelList());
    const data = await serviceGetModelList(projectId);
    dispatch(fetchModelListSuccess(data.data));
  } catch (err) {
    dispatch(fetchModelListError(err));
  }
};

export const serviceGetModelList = (projectId) => {
  return api(
    {
      url: `/project-resource/g/${organization}/${projectId}/list`,
      method: 'GET',
    },
    API_ENV.RESOURCE,
    projectId
  );
};

export const serviceUpdateModel = (projectId, resourceId, status) => {
  return api(
    {
      url: `/project-resource/g/${organization}/${projectId}/update/${resourceId}`,
      method: 'PUT',
      data: { status: status },
    },
    API_ENV.RESOURCE,
    projectId
  );
};

export const fetchModelList = () => {
  return {
    type: actions.FETCH_MODEL_LIST,
  };
};

export const fetchModelListSuccess = (data) => {
  return {
    type: actions.FETCH_MODEL_LIST_SUCCESS,
    payload: data,
  };
};

export const fetchModelListError = (error) => {
  return {
    type: actions.FETCH_MODEL_LIST_ERROR,
    payload: error,
  };
};
