import { matchPath } from 'react-router';
import { useLocation } from 'react-router-dom';
import get from 'lodash/get';

export const useProjectsParams = () => {
  const location = useLocation();
  const { pathname } = location;

  const match = matchPath(pathname, {
    path: '/projects/:projectId/:page',
    strict: false,
  });

  const params = get(match, 'params', {});

  return {
    params,
  };
};
