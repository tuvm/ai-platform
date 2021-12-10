import api from '../../utils/service/api';
import get from 'lodash/get';
import * as actions from '../../utils/constants/actions';
import moment from 'moment';
import 'moment-timezone';


export const actionQueryAPIUsage = (params = {}) => {
  const url = '/console/usage/visual';
  const tz = moment.tz.guess();
  params['tz'] = tz;
  return api({
    url,
    method: 'GET',
    params,
  });
};


export const actionGetResourceOptions = ({ params }) => async dispatch => {
  const url = '/resource/resources/list';
  dispatch({ type: actions.FETCH_RESOURCE_OPS })
  try {
      const res = await api({ url, method: 'GET', params });
      const data = get(res, 'data');
      const options = (data.modules || []).map(it => {return {value: it.slug, label: it.name}});
      dispatch({ type: actions.FETCH_RESOURCE_OPS_SUCCESS, payload: {options} })
  } catch (error) {
      dispatch({ type: actions.FETCH_RESOURCE_OPS_ERROR })
  }
}