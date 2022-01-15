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
      count: 0,
    },
    recent: {
      data: [],
      count: 0,
    },
  },
  resourceList: {},
  userList: {},
  jobList: {},
  modelList: {},
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
    case actions.FETCH_MODEL_LIST:
      return {
        ...state,
        modelListLoading: true,
        modelListError: false,
      };
    case actions.FETCH_MODEL_LIST_SUCCESS:
      return {
        ...state,
        modelListLoading: false,
        modelListLoaded: true,
        modelList: action.payload,
      };
    case actions.FETCH_MODEL_LIST_ERROR:
      return {
        ...state,
        modelListLoading: false,
        modelListError: true,
      };
    case actions.FETCH_JOB_LIST:
      return {
        ...state,
        jobListLoading: true,
        jobListError: false,
      };
    case actions.FETCH_JOB_LIST_SUCCESS:
      return {
        ...state,
        jobListLoading: false,
        jobListLoaded: true,
        jobList: action.payload,
      };
    case actions.FETCH_JOB_LIST_ERROR:
      return {
        ...state,
        jobListLoading: false,
        jobListError: true,
      };
    case actions.FETCH_USER_LIST:
      return {
        ...state,
        userListLoading: true,
        userListError: false,
      };
    case actions.FETCH_USER_LIST_SUCCESS:
      return {
        ...state,
        userListLoading: false,
        userListLoaded: true,
        userList: action.payload,
      };
    case actions.FETCH_USER_LIST_ERROR:
      return {
        ...state,
        userListLoading: false,
        userListError: true,
      };
    case actions.FETCH_PROJECT_LIST:
      return {
        ...state,
        projectListLoading: true,
        projectListError: false,
      };
    case actions.FETCH_PROJECT_LIST_SUCCESS:
      return {
        ...state,
        projectListLoading: false,
        projectListLoaded: true,
        projectList: action.payload,
      };
    case actions.FETCH_PROJECT_LIST_ERROR:
      return {
        ...state,
        projectListLoading: false,
        projectListError: true,
      };
    case actions.SET_ACTIVE_PROJECT:
      return {
        ...state,
        activeProject: action.payload,
      };
    case actions.FETCH_RESOURCE:
      return {
        ...state,
        resourceLoading: true,
        resourceLoadError: false,
      };
    case actions.FETCH_RESOURCE_SUCCESS:
      return {
        ...state,
        resourceLoading: false,
        resourceLoadError: false,
        resourceList: action.payload,
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
        resourceOptionsLoadError: false,
      };
    case actions.FETCH_RESOURCE_OPS_SUCCESS:
      return {
        ...state,
        resourceOptionsLoading: false,
        resourceOptionsLoadError: false,
        resourceOptions: action.payload,
      };

    case actions.FETCH_RESOURCE_OPS_ERROR:
      return {
        ...state,
        resourceOptionsLoading: false,
        resourceOptionsLoadError: true,
      };
    case actions.FETCH_GENERAL_TICKET:
      return {
        ...state,
        ticketLoading: true,
        ticketLoadError: false,
      };
    case actions.FETCH_GENERAL_TICKET_SUCCESS:
      return {
        ...state,
        ticketLoading: false,
        ticketLoadError: false,
        ticket: { ...state.ticket, general: action.payload },
      };

    case actions.FETCH_GENERAL_TICKET_ERROR:
      return {
        ...state,
        ticketLoading: false,
        ticketLoadError: true,
      };
    case actions.FETCH_PROJECT_TICKET:
      return {
        ...state,
        ticketLoading: true,
        ticketLoadError: false,
      };
    case actions.FETCH_PROJECT_TICKET_SUCCESS:
      return {
        ...state,
        ticketLoading: false,
        ticketLoadError: false,
        ticket: { ...state.ticket, project: action.payload },
      };
    case actions.FETCH_PROJECT_TICKET_ERROR:
      return {
        ...state,
        ticketLoading: false,
        ticketLoadError: true,
      };

    case actions.FETCH_CREDENTIAL_LIST:
      return {
        ...state,
        credentialListLoading: true,
        credentialLoadError: false,
      };
    case actions.FETCH_CREDENTIAL_LIST_SUCCESS:
      return {
        ...state,
        credentialListLoading: false,
        credentialLoadError: false,
        credentialList: action.payload,
      };
    case actions.FETCH_CREDENTIAL_LIST_ERROR:
      return {
        ...state,
        credentialListLoading: false,
        credentialLoadError: true,
      };
    default:
      return state;
  }
};

export default system;
