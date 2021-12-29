// import get from 'lodash/get';
// import api from '../../utils/service/api';
import * as actions from '../../utils/constants/actions';
import { API_ENV } from '../../utils/constants/config';
import { actionGetCredentialList } from '../ProjectSetting/Credentials/actions';
import api from '../system/api';
// import { API_ENV } from '../../utils/constants/config';

// const organization = 'cad';

export const getJoblist = (project_id, params) => async (dispatch) => {
  try {
    console.log(project_id);
    dispatch(fetchJobList());
    const _data = await actionGetCredentialList({
      params: { project_id: project_id },
    });
    if (_data && _data.length) {
      const key = _data[0].token;
      const data = await serviceGetJobList(project_id, key, params);
      dispatch(fetchJobListSuccess(data.data));
    } else {
      dispatch(fetchJobListError(_data));
    }
  } catch (err) {
    dispatch(fetchJobListError(err));
  }
};

export const serviceGetJobList = (project_id, key, params) => {
  return api(
    { url: '/jobs', method: 'GET', headers: { 'X-API-KEY': key }, params },
    API_ENV.DIAGNOSE,
    project_id
  );
  // return new Promise((resolve) =>
  //   setTimeout(() => {
  //     resolve({
  //       data: [
  //         {
  //           StudyInstanceUID: '1.2.840.113704.9.1000.16.0.20211022134910050',
  //           JobID: '1256987456',
  //           Priority: 'High',
  //           Status: 'Initial',
  //           Model: 'spinexray',
  //           Metadata: {},
  //           Result: {},
  //           CreatedTime: 1640249459,
  //           UpdatedTime: 1640249159,
  //         },
  //         {
  //           StudyInstanceUID: '1.2.840.113704.9.1000.16.0.20211022134910050',
  //           JobID: '1256987454',
  //           Priority: 'Medium',
  //           Status: 'Validating',
  //           Model: 'chestxray',
  //           Metadata: {},
  //           Result: {},
  //           CreatedTime: 1640249459,
  //           UpdatedTime: 1640249159,
  //         },
  //         {
  //           StudyInstanceUID: '1.2.840.113704.9.1000.16.0.20211022134910050',
  //           JobID: '1256987457',
  //           Priority: 'Low',
  //           Status: 'Done',
  //           Model: 'chestxray',
  //           Metadata: {},
  //           Result: {},
  //           CreatedTime: 1640249459,
  //           UpdatedTime: 1640249159,
  //         },
  //       ],
  //       count: 3,
  //     });
  //   }, 200)
  // );
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
