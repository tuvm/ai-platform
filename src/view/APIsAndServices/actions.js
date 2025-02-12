import api from '../system/api';
import get from 'lodash/get';
import * as actions from '../../utils/constants/actions';
import moment from 'moment';
import 'moment-timezone';
import { API_ENV } from '../../utils/constants/config';

const organization = 'cad';

export const actionQueryAPIUsage = (params = {}) => {
  const url = `/usage/orgs/${organization}/projects/${params.project_id}/visual`;
  const tz = moment.tz.guess();
  params['tz'] = tz;
  return api(
    {
      url,
      method: 'GET',
      params,
    },
    API_ENV.CONSOLE,
    params.project_id
  );
};

export const actionGetResourceOptions =
  ({ params }) =>
  async (dispatch) => {
    const url = '/resources/list';
    dispatch({ type: actions.FETCH_RESOURCE_OPS });
    try {
      const res = await api(
        { url, method: 'GET', params },
        API_ENV.RESOURCE,
        params.project_id
      );
      const data = get(res, 'data');
      const options = (data.modules || []).map((it) => {
        return { value: it.slug, label: it.name };
      });
      dispatch({
        type: actions.FETCH_RESOURCE_OPS_SUCCESS,
        payload: { options },
      });
    } catch (error) {
      dispatch({ type: actions.FETCH_RESOURCE_OPS_ERROR });
    }
  };
