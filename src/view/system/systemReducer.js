import cookie from 'js-cookie';
import { VINLAB_LOCALE } from '../../utils/constants/config';
import * as actions from '../../utils/constants/actions';

const initialState = {
  locale: cookie.get(VINLAB_LOCALE) || 'en',
  isLoading: false,
  profile: {},
  users: {},
  isFetchingUser: false,
  apikeys: [],
};

const system = (state = initialState, action) => {
  switch (action.type) {
    case actions.CHANGE_LANGUAGE:
      return { ...state, locale: action.payload };
    case actions.FETCHING_PROFILE:
      return { ...state, profile: action.payload };
    case actions.SHOW_LOADING:
      return { ...state, isLoading: true };
    case actions.HIDE_LOADING:
      return { ...state, isLoading: false };
    case actions.FETCH_USERS:
      return { ...state, users: action.payload, isFetchingUser: false };
    case actions.FETCHING_USERS:
      return { ...state, isFetchingUser: action.payload };
    case actions.FETCH_API_KEY_LIST:
      return { ...state, apikeys: action.payload };
    case actions.FETCH_PROJECT_LIST:
      return {
        ...state,
        isFetchingProjectList: true,
        projectListError: false
      };
    case actions.FETCH_PROJECT_LIST_SUCCESS:
      return {
        ...state,
        projectListLoading: true,
        projectListLoaded: true,
        projectList: action.payload
      };

    case actions.FETCH_PROJECT_LIST_ERROR:
      return {
        ...state,
        projectListLoading: false,
        projectListError: true
      };
    default:
      return state;
  }
};

export default system;
