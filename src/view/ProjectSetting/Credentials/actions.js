import * as actions from '../../../utils/constants/actions';
import { serviceGetCredentialList, serviceGetResourceList } from './services';

export const actionGetResourceList =
  ({ params }) =>
  async (dispatch) => {
    dispatch({ type: actions.FETCH_RESOURCE });
    try {
      const res = await serviceGetResourceList(params);
      dispatch({ type: actions.FETCH_RESOURCE_SUCCESS, payload: res.data });
    } catch (error) {
      dispatch({ type: actions.FETCH_RESOURCE_ERROR });
    }
  };

export const actionGetCredentialList = (project_id) => async (dispatch) => {
  try {
    dispatch(fetchCredentialList());
    const data = await serviceGetCredentialList(project_id);

    dispatch(fetchCredentialListSuccess(data));
  } catch (err) {
    dispatch(fetchCredentialListError(err));
  }
};

export const fetchCredentialList = () => {
  return {
    type: actions.FETCH_CREDENTIAL_LIST,
  };
};

export const fetchCredentialListSuccess = (data) => {
  return {
    type: actions.FETCH_CREDENTIAL_LIST_SUCCESS,
    payload: data,
  };
};

export const fetchCredentialListError = (error) => {
  return {
    type: actions.FETCH_CREDENTIAL_LIST_ERROR,
    payload: error,
  };
};
