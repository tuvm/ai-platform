import api from '../../utils/service/api';

export const actionCreateProject = (data = {}) => {
  return api({
    method: 'post',
    url: '/api/projects',
    data,
  });
};
