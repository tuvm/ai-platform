import * as actions from '../../utils/constants/actions';
import { API_ENV } from '../../utils/constants/config';
import api from '../system/api';

const organization = 'cad';

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
