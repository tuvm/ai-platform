import cookie from 'js-cookie';
import { AI_PLATFORM_LOCALE } from '../../utils/constants/config';
import * as actions from '../../utils/constants/actions';

const initialState = {
  locale: cookie.get(AI_PLATFORM_LOCALE) || 'en',
  isLoading: false,
  profile: {},
  users: {},
  isFetchingUser: false,
  apikeys: [],
  activeProject: null,
  projectList: {
    all: {
      data: [],
      count: 0
    },
    recent: {
      data: [],
      count: 0
    }
  },
  resourceList: {
    
  }
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
        projectListLoading: true,
        projectListError: false
      };
    case actions.FETCH_PROJECT_LIST_SUCCESS:
      return {
        ...state,
        projectListLoading: false,
        projectListLoaded: true,
        projectList: action.payload
      };

    case actions.FETCH_PROJECT_LIST_ERROR:
      return {
        ...state,
        projectListLoading: false,
        projectListError: true
      };
    case actions.SET_ACTIVE_PROJECT:
      return {
        ...state,
        activeProject: action.payload
      }
    case actions.FETCH_RESOURCE:
      return {
        ...state,
        resourceLoading: true,
        resourceLoadError: false
      };
    case actions.FETCH_RESOURCE_SUCCESS:
      return {
        ...state,
        resourceLoading: false,
        resourceLoadError: false,
        resourceList: action.payload
      };

    case actions.FETCH_RESOURCE_ERROR:
      return {
        ...state,
        resourceLoading: false,
        resourceLoadError: true,
      };
    case actions.FETCH_RESOURCE_OPS:
      return {
        ...state,
        resourceOptionsLoading: true,
        resourceOptionsLoadError: false
      };
    case actions.FETCH_RESOURCE_OPS_SUCCESS:
      return {
        ...state,
        resourceOptionsLoading: false,
        resourceOptionsLoadError: false,
        resourceOptions: action.payload
      };

    case actions.FETCH_RESOURCE_OPS_ERROR:
      return {
        ...state,
        resourceOptionsLoading: false,
        resourceOptionsLoadError: true,
      };
    default:
      return state;
  }
};

export default system;
