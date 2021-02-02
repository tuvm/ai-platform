import api from '../../utils/service/api';

export const actionQueryAPIUsage = (params = {}) => {
  const url = '/usage/visual';
  return api({
    url,
    method: 'GET',
    params,
  });
};
