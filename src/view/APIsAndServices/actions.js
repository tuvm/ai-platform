import api from '../../utils/service/api';

export const actionQueryAPIUsage = (params = {}) => {
  const url = '/console/usage/visual';
  return api({
    url,
    method: 'GET',
    params,
  });
};
