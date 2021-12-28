// import get from 'lodash/get';
// import api from '../../utils/service/api';
import * as actions from '../../utils/constants/actions';
// import { API_ENV } from '../../utils/constants/config';

// const organization = 'cad';

export const getModellist = () => async (dispatch) => {
  try {
    dispatch(fetchModelList());
    const data = await serviceGetModelList();
    dispatch(fetchModelListSuccess(data));
  } catch (err) {
    dispatch(fetchModelListError(err));
  }
};

export const serviceGetModelList = () => {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve({
        data: [
          {
            id: 1,
            title: 'Chest Xray detection',
            description:
              'X-ray AI assistant for emergency department physicians and radiologists.',
            vendor: 'VinBigdata, JSC',
            image: '/modelImage.svg',
            status: 'enabled',
            createdTime: 1640249459,
            updatedTime: 1640249159,
          },
          {
            id: 2,
            title: 'Chest Xray detection',
            description:
              'X-ray AI assistant for emergency department physicians and radiologists.',
            vendor: 'VinBigdata, JSC',
            image: '/modelImage.svg',
            status: 'enabled',
            createdTime: 1640249459,
            updatedTime: 1640249159,
          },
          {
            id: 3,
            title: 'Chest Xray detection',
            description:
              'X-ray AI assistant for emergency department physicians and radiologists.',
            vendor: 'VinBigdata, JSC',
            image: '/modelImage.svg',
            status: 'disabled',
            createdTime: 1640249459,
            updatedTime: 1640249159,
          },
          {
            id: 4,
            title: 'Chest Xray detection',
            description:
              'X-ray AI assistant for emergency department physicians and radiologists.',
            vendor: 'VinBigdata, JSC',
            image: '/modelImage.svg',
            status: 'enabled',
            createdTime: 1640249459,
            updatedTime: 1640249159,
          },
          {
            id: 5,
            title: 'Chest Xray detection',
            description:
              'X-ray AI assistant for emergency department physicians and radiologists.',
            vendor: 'VinBigdata, JSC',
            image: '/modelImage.svg',
            status: 'disabled',
            createdTime: 1640249459,
            updatedTime: 1640249159,
          },
          {
            id: 6,
            title: 'Chest Xray detection',
            description:
              'X-ray AI assistant for emergency department physicians and radiologists.',
            vendor: 'VinBigdata, JSC',
            image: '/modelImage.svg',
            status: 'enabled',
            createdTime: 1640249459,
            updatedTime: 1640249159,
          },
          {
            id: 7,
            title: 'Chest Xray detection',
            description:
              'X-ray AI assistant for emergency department physicians and radiologists.',
            vendor: 'VinBigdata, JSC',
            image: '/modelImage.svg',
            status: 'enabled',
            createdTime: 1640249459,
            updatedTime: 1640249159,
          },
        ],
        count: 7,
      });
    }, 0)
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
