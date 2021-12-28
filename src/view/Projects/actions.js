import get from 'lodash/get';
import api from '../system/api';
import * as actions from '../../utils/constants/actions';
import { API_ENV } from '../../utils/constants/config';

const organization = 'cad';

export const actionCreateProject = ({ params, payload }) => {
  const url = `/projects/orgs/${organization}/new`;
  return api(
    {
      url,
      data: payload,
      method: 'POST',
    },
    API_ENV.CONSOLE
  );
};

export const actionGetProjectDetail = ({ payload }) => {
  const url = `/projects/orgs/${organization}/detail/${payload.projectId}`;
  return api(
    {
      url,
      method: 'GET',
    },
    API_ENV.CONSOLE
  );
};

export const actionGetProjectList = () => async (dispatch) => {
  const url = `/projects/orgs/${organization}/list`;
  dispatch(fetchProjectList());
  try {
    const data = await api(
      {
        url,
        method: 'GET',
      },
      API_ENV.CONSOLE
    );

    const payload = get(data, 'data') || {};
    const recent = get(payload, 'recent.data') || [];
    payload.recent.data = recent.slice(0, 5);
    dispatch(fetchProjectListSuccess(payload));
    return payload;
  } catch (error) {
    console.log(error);
    dispatch(fetchProjectListError(error));
  }
};

// export const actionGetProjectList = () => {
//   return {
//     types: [
//       actions.FETCH_PROJECT_LIST,
//       actions.FETCH_PROJECT_LIST_SUCCESS,
//       actions.FETCH_PROJECT_LIST_ERROR,
//     ],
//     payload: {
//       request: {
//         url: `/projects/orgs/${organization}/list`,
//       },
//     },
//   };
// };

export const fetchProjectList = () => {
  return {
    type: actions.FETCH_PROJECT_LIST,
  };
};

export const fetchProjectListSuccess = (data) => {
  return {
    type: actions.FETCH_PROJECT_LIST_SUCCESS,
    payload: data,
  };
};

export const fetchProjectListError = (error) => {
  return {
    type: actions.FETCH_PROJECT_LIST_ERROR,
    payload: error,
  };
};
