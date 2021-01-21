import {
  HomeOutlined,
  ApiOutlined,
  KeyOutlined,
  FileTextOutlined,
  SettingOutlined,
} from '@ant-design/icons';

// common
export const TOKEN = 'token';
export const REFRESH_TOKEN = 'refresh_token';
export const FIRST_REFRESH_TOKEN = 'first_refresh_token';
export const EXPIRED_REFRESH_TOKEN = 60 * 60 * 1000;
export const VINLAB_LOCALE = 'vinlab-locale';

const {
  OIDC_ACCESS_TOKEN_URI,
  OIDC_AUTHORIZATION_URI,
  OIDC_REDIRECT_URI,
  OIDC_CLIENT_ID,
  OIDC_LOGOUT_URI,
  OIDC_USERINFO_ENDPOINT,
  OIDC_SCOPE,
  DASHBOARD_URL_PREFIX,
  SERVER_BASE_URL,
  MEDICAL_VIEWER_URL,
  OIDC_AUDIENCE,
} = process.env || {};
// console.log('VANHT-Config.env', process.env);

// let env = process.env.BUILD_MODE || 'local'; // local, dev, stg

export const BASE_FE_PREFIX = DASHBOARD_URL_PREFIX || '/dashboard';
// export const URL_VIEWER = MEDICAL_VIEWER_URL || 'http://localhost:3000/medical-view/viewer';
export const URL_VIEWER =
  MEDICAL_VIEWER_URL || window.origin + '/medical-view/viewer';

const REDIRECT_URI = OIDC_REDIRECT_URI || window.origin;
const CLIENT_ID = OIDC_CLIENT_ID || 'vinlab-frontend';
const BASE_URL = SERVER_BASE_URL || 'http://dev-67.vinlab.ai';
const AUTH_URL = BASE_URL;

export let CONFIG_SERVER = {
  BASE_URL: BASE_URL,
  AUTH_URL: AUTH_URL,
  REDIRECT_URI: REDIRECT_URI,
  CLIENT_ID: CLIENT_ID,
  RESPONSE_TYPE: 'code',
  AUDIENCE: OIDC_AUDIENCE || 'vinlab-backend',
  SCOPE: OIDC_SCOPE || 'profile',
  STATE: Math.random().toString(36).substring(2),
  OIDC_ACCESS_TOKEN_URI,
  OIDC_AUTHORIZATION_URI,
  OIDC_LOGOUT_URI,
  OIDC_USERINFO_ENDPOINT,
  TOKEN_PERMISSION: ['api#all']
};

// routes
export const routes = {
  HOME: '/',
  LOGIN: '/login',
  CREATE_PROJECT: '/dascreate-project',
  CREATE_PROJECT_ID: '/create-project/:projectId',
  PROJECTS: '/projects',
  STUDY_LIST: '/study-list',
  STUDY_LIST_ID: '/study-list/:projectId',
  RECENT: '/recent',
  LABEL_MANAGEMENT: '/label-management',
  SEARCH: '/search',
  API_AND_SERVICES: '/api-and-services',
  TOKEN_GENERATOR: '/token-generator',
  BILLING: '/billing',
  SETTING: '/setting',
};


export const APP_ROUTES = [
  {
    icon: <HomeOutlined />,
    name: "IDS_HOME",
    pathname: routes.HOME,
    isShow: true,
  },
  {
    icon: <ApiOutlined />,
    name: "IDS_API_AND_SERVICE",
    pathname: routes.API_AND_SERVICES,
    isShow: true,
  },
  {
    icon: <KeyOutlined />,
    name: "IDS_TOKEN_GENERATOR",
    pathname: routes.TOKEN_GENERATOR,
    isShow: true,
  },
  {
    icon: <FileTextOutlined />,
    name: "IDS_BILLING",
    pathname: routes.BILLING,
    isShow: true,
  },
  {
    icon: <SettingOutlined />,
    name: "IDS_SETTING",
    pathname: routes.SETTING,
    isShow: true,
  },
];

export const STUDY_STATUS = {
  ALL: 'count',
  ASSIGNED: 'ASSIGNED',
  UNASSIGNED: 'UNASSIGNED',
  COMPLETED: 'COMPLETED',
};

export const TASK_STATUS = {
  ALL: 'count',
  NEW: 'NEW',
  DOING: 'DOING',
  COMPLETED: 'COMPLETED',
};

export const LABEL_TYPE = [
  { text: 'Impression', value: 'IMPRESSION' },
  { text: 'Finding', value: 'FINDING' },
];

export const PAINT_SCOPE = {
  STUDY: 'STUDY',
  SERIES: 'SERIES',
  IMAGE: 'IMAGE',
};

export const LABEL_SCOPE = [
  { text: 'Study', value: PAINT_SCOPE.STUDY, isDisable: 'FINDING' },
  { text: 'Series', value: PAINT_SCOPE.SERIES, isDisable: 'FINDING' },
  { text: 'Image', value: PAINT_SCOPE.IMAGE },
];

export const PAINT_TYPE = {
  TAG: 'TAG',
  BOUNDING_BOX: 'BOUNDING_BOX',
  POLYGON: 'POLYGON',
  MASK: 'MASK',
};

export const ANNOTATION_TYPE = [
  { text: 'Tag', value: PAINT_TYPE.TAG, isDisable: 'FINDING' },
  {
    text: 'Bounding box',
    value: PAINT_TYPE.BOUNDING_BOX,
    isDisable: 'IMPRESSION',
  },
  { text: 'Polygon', value: PAINT_TYPE.POLYGON, isDisable: 'IMPRESSION' },
  { text: 'Mask', value: PAINT_TYPE.MASK, isDisable: 'IMPRESSION' },
];

export const DEFAULT_COLOR_PICKER = [
  '#f44336',
  '#e91e63',
  '#9c27b0',
  '#673ab7',
  '#3f51b5',
  '#2196f3',
  '#03a9f4',
  '#00bcd4',
  '#009688',
  '#4caf50',
  '#8bc34a',
  '#cddc39',
  '#ffeb3b',
  '#ffc107',
  '#ff9800',
  '#ff5722',
  '#795548',
  '#607d8b',
];

export const SESSION_TYPE = {
  STUDY: 'STUDY',
  TASK: 'TASK',
};

export const ROLES = {
  PO: 'PO',
  LABELER: 'Labeler',
};

export const STUDY_TABS = {
  DATA: 'DATA',
  TASK: 'TASK',
  SETTING: 'SETTING',
  ANNOTATE: 'ANNOTATE',
  REVIEW: 'REVIEW',
};

export const ROLE_TASK = {
  MANAGER: 'MANAGER',
  ANNOTATOR: 'ANNOTATOR',
  REVIEWER: 'REVIEWER',
};

export const WORKFLOW_PROJECT = {
  SINGLE: 'SINGLE',
  TRIANGLE: 'TRIANGLE',
};

export const USER_ROLES = {
  ANNOTATOR: 'ANNOTATOR',
  REVIEWER: 'REVIEWER',
  PROJECT_OWNER: 'PROJECT_OWNER',
};

export const FILTER_DAYS = [7, 14, 30];