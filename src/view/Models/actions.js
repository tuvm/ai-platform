import * as actions from '../../utils/constants/actions';
import { API_ENV } from '../../utils/constants/config';
import api from '../system/api';

const organization = 'cad';

export const getRule = (projectId, model) => {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve({
        data: {
          model: 'brainct',
          query: {
            expressions: [
              {
                condition: 'EQUAL',
                tag: 'Modality',
                value: ['CT'],
              },
            ],
            nested: {
              expressions: [
                {
                  condition: 'EQUAL',
                  tag: 'BodyPartExamined',
                  value: ['BRAIN'],
                },
              ],
              nested: {
                expressions: [
                  {
                    condition: 'EQUAL',
                    tag: 'BodyPartExamined',
                    value: ['HEAD'],
                  },
                  {
                    condition: 'CONTAIN',
                    tag: 'StudyDescription',
                    value: ['SO'],
                  },
                ],
                operator: 'AND',
              },
              operator: 'OR',
            },
            operator: 'AND',
          },
        },
      });
    }, 200)
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
