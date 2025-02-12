import {
  HomeOutlined,
  ApiOutlined,
  KeyOutlined,
  FileTextOutlined,
  SettingOutlined,
  DashboardOutlined,
  CodeOutlined,
  UserOutlined,
  RocketOutlined,
} from '@ant-design/icons';

import find from 'lodash/find';
import {
  PERM_CREDENTIAL_GET,
  PERM_USER_PROJECT_GET,
  PERM_PROJECT_DASHBOARD_GET,
  PERM_PROJECT_JOB_GET,
  PERM_PROJECT_MODEL_GET,
} from '../permission/perms';

// common
export const REFRESH_TOKEN = 'refresh_token';
export const FIRST_REFRESH_TOKEN = 'first_refresh_token';
export const EXPIRED_REFRESH_TOKEN = 60 * 60 * 1000;
export const AI_PLATFORM_LOCALE = 'ai-platform-locale';

export const TOKEN = 'token';
export const PROJECT_TOKEN = 'project_token';
export const CURRENT_PROJECT = 'current_project';
export const POLLING_TOKEN_TIMER = 4 * 60000;
export const LOCAL_STORAGE_REALM_ID = 'realm_id';
export const DEFAULT_REALM_ID = 'cad';

export const MODEL_TO_SLUG = {
  ChestXray: 'chestxray',
  SpineXray: 'spinexr',
  Mammography: 'mammogram',
  BrainCT: 'brainct',
  BrainMRI: 'brainmri',
  LungCT: 'lungct',
  LiverCT: 'liverct',
};

export const SLUG_TO_MODEL = {
  chestxray: 'ChestXray',
  spinexr: 'SpineXray',
  mammogram: 'Mammography',
  brainct: 'BrainCT',
  brainmri: 'BrainMRI',
  lungct: 'LungCT',
  liverct: 'LiverCT',
};

export const MODEL_STATUS = {
  ON: 'on',
  OFF: 'off',
};

const {
  OIDC_ACCESS_TOKEN_URI,
  OIDC_AUTHORIZATION_URI,
  OIDC_REDIRECT_URI,
  OIDC_CLIENT_ID,
  OIDC_LOGOUT_URI,
  OIDC_USERINFO_ENDPOINT,
  OIDC_SCOPE,
  DASHBOARD_URL_PREFIX,
  OIDC_AUDIENCE,
  REACT_APP_BACKEND_URL,
  REACT_APP_AUTH_URL,
  REACT_APP_CONSOLE_API_URL,
  REACT_APP_RESOURCE_SERVICE_URL,
  REACT_APP_KEY_SERVICE_URL,
  REACT_APP_DIAGNOSE_API_URL,
  REACT_APP_AUTO_DIAGNOSE_API_URL,
  OIDC_REALM_ID,
} = process.env || {};

export const BASE_FE_PREFIX = DASHBOARD_URL_PREFIX || '/dashboard';

const REDIRECT_URI = OIDC_REDIRECT_URI || window.origin;
const CLIENT_ID = OIDC_CLIENT_ID || 'console-ui';

export let CONFIG_SERVER = {
  REACT_APP_BACKEND_URL: REACT_APP_BACKEND_URL || 'https://platform.vindr.ai',
  REACT_APP_AUTH_URL: REACT_APP_AUTH_URL || window.origin,
  REACT_APP_CONSOLE_API_URL:
    REACT_APP_CONSOLE_API_URL || REACT_APP_BACKEND_URL + '/console',
  REACT_APP_RESOURCE_SERVICE_URL:
    REACT_APP_RESOURCE_SERVICE_URL || REACT_APP_BACKEND_URL + '/resource',
  REACT_APP_KEY_SERVICE_URL:
    REACT_APP_KEY_SERVICE_URL || REACT_APP_BACKEND_URL + '/key',
  REACT_APP_DIAGNOSE_API_URL:
    REACT_APP_DIAGNOSE_API_URL || REACT_APP_BACKEND_URL + '/diagnose',
  REACT_APP_AUTO_DIAGNOSE_API_URL:
    REACT_APP_AUTO_DIAGNOSE_API_URL || REACT_APP_BACKEND_URL + '/auto-diagnose',
  REDIRECT_URI: REDIRECT_URI,
  CLIENT_ID: CLIENT_ID,
  RESPONSE_TYPE: 'code',
  AUDIENCE: OIDC_AUDIENCE || 'cad-api',
  SCOPE: OIDC_SCOPE || '',
  REALM_ID: OIDC_REALM_ID || 'cad',
  STATE: Math.random().toString(36).substring(2),
  OIDC_ACCESS_TOKEN_URI,
  OIDC_AUTHORIZATION_URI,
  OIDC_LOGOUT_URI,
  OIDC_USERINFO_ENDPOINT,
  TOKEN_PERMISSION: ['api#all'],
};

export const API_ENV = {
  BACKEND: CONFIG_SERVER.REACT_APP_BACKEND_URL,
  AUTH: CONFIG_SERVER.REACT_APP_AUTH_URL,
  CONSOLE: CONFIG_SERVER.REACT_APP_CONSOLE_API_URL,
  RESOURCE: CONFIG_SERVER.REACT_APP_RESOURCE_SERVICE_URL,
  KEY: CONFIG_SERVER.REACT_APP_KEY_SERVICE_URL,
  DIAGNOSE: CONFIG_SERVER.REACT_APP_DIAGNOSE_API_URL,
  AUTO_DIAGNOSE: CONFIG_SERVER.REACT_APP_AUTO_DIAGNOSE_API_URL,
};

export const OIDC_SETTINGS = 'OIDC_SETTINGS';
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
  API_KEYS: '/api-keys',
  BILLING: '/billing',
  SETTING: '/setting',
  DASHBOARD: '/dashboard',
  DASHBOARD_MENU: {
    PROJECTS: '/dashboard/projects',
    // ANALYSIS: '/dashboard/analysis'
  },
  PROJECT_SETTING: '/project-setting',
  USERS: '/user',
  JOBS: '/jobs',
  MODELS: '/models',
};

export const APP_ROUTES = [
  // {
  //   icon: <HomeOutlined />,
  //   name: 'IDS_HOME',
  //   pathname: routes.HOME,
  //   isShow: true,
  // },
  // {
  //   icon: <ApiOutlined />,
  //   name: "IDS_PROJECTS",
  //   pathname: routes.PROJECTS,
  //   isShow: true,
  // },
  {
    icon: <DashboardOutlined />,
    name: 'IDS_DASHBOARD',
    pathname: routes.DASHBOARD,
    isShow: true,
    // requiredPerms: [PERM_PROJECT_DASHBOARD_GET],
    hasSubmenu: false,
    submenu: [
      {
        icon: <ApiOutlined />,
        name: 'IDS_DASHBOARD_PROJECTS',
        pathname: routes.DASHBOARD_MENU.PROJECTS,
        isShow: true,
      },
    ],
  },
  // {
  //   icon: <UserOutlined />,
  //   name: 'IDS_USER',
  //   pathname: routes.USERS,
  //   isShow: true,
  // },
  {
    icon: <CodeOutlined />,
    name: 'Jobs',
    pathname: routes.JOBS,
    isShow: true,
    requiredPerms: [PERM_PROJECT_JOB_GET],
  },
  {
    icon: <RocketOutlined />,
    name: 'Models',
    pathname: routes.MODELS,
    isShow: true,
    requiredPerms: [PERM_PROJECT_MODEL_GET],
    hasSubmenu: false,
    submenu: [
      { name: 'VinDr-BrainMR', pathname: '/brainmri', isShow: false },
      { name: 'VinDr-BrainCT', pathname: '/brainct', isShow: false },
      { name: 'VinDr-LiverCT', pathname: '/liverct', isShow: false },
      { name: 'VinDr-Mammo', pathname: '/mammogram', isShow: false },
      { name: 'VinDr-SpineXR', pathname: '/spinexr', isShow: false },
      { name: 'VinDr-ChestCT', pathname: '/lungct', isShow: false },
      { name: 'VinDr-ChestXray', pathname: '/chestxray', isShow: false },
    ],
  },
  {
    icon: <ApiOutlined />,
    name: 'IDS_API_AND_SERVICE',
    pathname: routes.API_AND_SERVICES,
    isShow: false,
  },
  {
    icon: <KeyOutlined />,
    name: 'IDS_API_KEY',
    pathname: routes.API_KEYS,
    isShow: false,
  },
  {
    icon: <KeyOutlined />,
    name: 'IDS_PROJECT_SETTING',
    pathname: routes.PROJECT_SETTING,
    isShow: true,
    // requiredPerms: [PERM_USER_PROJECT_GET, PERM_CREDENTIAL_GET],
  },
  {
    icon: <FileTextOutlined />,
    name: 'IDS_BILLING',
    pathname: routes.BILLING,
    isShow: false,
  },
  {
    icon: <SettingOutlined />,
    name: 'IDS_SETTING',
    pathname: routes.SETTING,
    isShow: false,
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

export const ROWS_PER_PAGE = [10, 15, 20, 25, 50];

export const KEY_LIST = {
  lungct: 'Lung CT',
  mammogram: 'Mammography',
  chestxray: 'Chest Xray',
  liverct: 'Liver CT',
  brainct: 'Brain CT',
  brainmri: 'Brain MRI',
  spinexr: 'Spine XR',
};

export const API_SCOPES = [
  {
    key: 'chestxray',
    name: 'API ' + KEY_LIST.chestxray,
    description: 'IDS_CHEST_SCOPE_DESCRIPTION',
  },
  {
    key: 'mammogram',
    name: 'API ' + KEY_LIST.mammogram,
    description: 'IDS_MAMMO_SCOPE_DESCRIPTION',
  },
  {
    key: 'lungct',
    name: 'API ' + KEY_LIST.lungct,
    description: 'IDS_LUNGCT_SCOPE_DESCRIPTION',
  },
  {
    key: 'liverct',
    name: 'API ' + KEY_LIST.liverct,
    description: 'IDS_LIVER_SCOPE_DESCRIPTION',
  },
  {
    key: 'brainct',
    name: 'API ' + KEY_LIST.brainct,
    description: 'IDS_BRAIN_CT_SCOPE_DESCRIPTION',
  },
  {
    key: 'brainmri',
    name: 'API ' + KEY_LIST.brainmri,
    description: 'IDS_BRAIN_MRI_SCOPE_DESCRIPTION',
  },
  {
    key: 'spinexr',
    name: 'API ' + KEY_LIST.spinexr,
    description: 'IDS_SPINE_SCOPE_DESCRIPTION',
  },
];

export const VINDR_MODULES = [
  {
    name: 'VinDr ChestXray',
    key: 'vindr-chestxray',
  },
  {
    name: 'VinDr Mammo',
    key: 'vindr-mammo',
  },
  {
    name: 'VinDr SpineXR',
    key: 'vindr-spinexr',
  },
  {
    name: 'VinDr LungCT',
    key: 'vindr-lungct',
  },
  {
    name: 'VinDr LiverCT',
    key: 'vindr-liverct',
  },
  {
    name: 'VinDr BrainCT',
    key: 'vindr-brainct',
  },
  {
    name: 'VinDr BrainMRI',
    key: 'vindr-brainmri',
  },
];

export const CHART_COLORS = {
  lungct: '#97DAFF',
  mammogram: '#eb34b1',
  chestxray: '#AAFAD8',
  liverct: '#FFC552',
  brainct: '#eb4c34',
  brainmri: '#344feb',
  spinexr: '#C4B5FF',
};

export const CHART_TYPE_COLORS = {
  Total: '#97DAFF',
  Error: '#eb4c34',
  Default: '#eb34b1',
};

export const PAGES_HAS_NO_LAYOUT = [
  '/',
  '/projects',
  '/user',
  '/error',
  '/not-found',
  '/no-permission',
];

export const PUBLIC_PATH = ['/error', '/not-found', '/no-permission'];

export const QUOTA_DEV_TEMPLATE = {
  chestxray: {
    quota: '100',
    period: 'daily',
  },
  mammo: {
    quota: '100',
    period: 'daily',
  },
  lungct: {
    quota: '100',
    period: 'daily',
  },
  brainct: {
    quota: '100',
    period: 'daily',
  },
  brainmri: {
    quota: '100',
    period: 'daily',
  },
  liverct: {
    quota: '100',
    period: 'daily',
  },
  spinexr: {
    quota: '100',
    period: 'daily',
  },
};

export const ENV_OPTIONS = {
  PRO: 'Production',
  DEV: 'Development',
  1: 'Development',
  2: 'Production',
  dev: 'Development',
  prod: 'Production',
};

export const regex_name = new RegExp(
  /^[0-9a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s -]+$/i
);

export const getModuleName = (modules, slug) => {
  let finder = {};
  if (modules && slug) {
    finder = find(modules, { slug: slug }) || {};
  }
  return finder;
};

export const PERIOD_SELECTION = [
  {
    label: 'Daily',
    value: 'daily',
  },
  {
    label: 'Monthly',
    value: 'monthly',
  },
  {
    label: 'Annualy',
    value: 'annualy',
  },
  {
    label: 'Not reset',
    value: 'not_reset',
  },
];

export const getPeriodSelected = (key) => {
  let time = {};
  if (key) {
    time = find(PERIOD_SELECTION, { value: key }) || {};
  }
  return time;
};
