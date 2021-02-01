import api from '../../utils/service/api';

export const actionFetchBillingSummary = (params = {}) => {
  return api({ method: 'get', url: '/api/billing-summary', params });
};
