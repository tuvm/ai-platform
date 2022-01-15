// import get from 'lodash/get';
// import api from '../../utils/service/api';
import * as actions from '../../utils/constants/actions';
import { API_ENV } from '../../utils/constants/config';
import api from '../system/api';
// import { API_ENV } from '../../utils/constants/config';

// const organization = 'cad';

export const actiongetJoblist =
  (project_id, params, key) => async (dispatch) => {
    try {
      dispatch(fetchJobList());
      const data = await serviceGetJobList(project_id, key, params);
      dispatch(fetchJobListSuccess(data.data));
    } catch (err) {
      dispatch(fetchJobListError(err));
    }
  };

export const serviceGetJobList = (project_id, key, params) => {
  return api(
    {
      url: '/jobs-admin',
      method: 'GET',
      headers: { 'X-API-KEY': key },
      params,
    },
    API_ENV.DIAGNOSE,
    project_id
  );
};

export const fetchJobList = () => {
  return {
    type: actions.FETCH_JOB_LIST,
  };
};

export const fetchJobListSuccess = (data) => {
  return {
    type: actions.FETCH_JOB_LIST_SUCCESS,
    payload: data,
  };
};

export const fetchJobListError = (error) => {
  return {
    type: actions.FETCH_JOB_LIST_ERROR,
    payload: error,
  };
};
