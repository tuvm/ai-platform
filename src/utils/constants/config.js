import {
  HomeOutlined,
  ApiOutlined,
  KeyOutlined,
  FileTextOutlined,
  SettingOutlined,
} from '@ant-design/icons';

// common
export const REFRESH_TOKEN = 'refresh_token';
export const FIRST_REFRESH_TOKEN = 'first_refresh_token';
export const EXPIRED_REFRESH_TOKEN = 60 * 60 * 1000;
export const VINLAB_LOCALE = 'vinlab-locale';

export const TOKEN = 'token';
export const POLLING_TOKEN_TIMER = 4 * 60000;
export const LOCAL_STORAGE_REALM_ID = 'realm_id';

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
  OIDC_REALM_ID
} = process.env || {};


export const BASE_FE_PREFIX = DASHBOARD_URL_PREFIX || '/dashboard';

const REDIRECT_URI = OIDC_REDIRECT_URI || window.origin;
const CLIENT_ID = OIDC_CLIENT_ID || 'console-ui';

export let CONFIG_SERVER = {
  REACT_APP_BACKEND_URL: REACT_APP_BACKEND_URL || 'https://platform.vindr.ai',
  REACT_APP_AUTH_URL: REACT_APP_AUTH_URL || window.origin,
  REDIRECT_URI: REDIRECT_URI,
  CLIENT_ID: CLIENT_ID,
  RESPONSE_TYPE: 'code',
  AUDIENCE: OIDC_AUDIENCE || 'console-api',
  SCOPE: OIDC_SCOPE || '',
  REALM_ID: OIDC_REALM_ID || 'ai-platform',
  STATE: Math.random().toString(36).substring(2),
  OIDC_ACCESS_TOKEN_URI,
  OIDC_AUTHORIZATION_URI,
  OIDC_LOGOUT_URI,
  OIDC_USERINFO_ENDPOINT,
  TOKEN_PERMISSION: ['api#all'],
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
  DASHBOARD:'/dashboard',
  DASHBOARD_MENU: {
    PROJECTS: '/dashboard/projects',
    // ANALYSIS: '/dashboard/analysis'
  },
  PROJECT_SETTING: '/project-setting'
};

export const APP_ROUTES = [
  {
    icon: <HomeOutlined />,
    name: 'IDS_HOME',
    pathname: routes.HOME,
    isShow: false,
  },
  // {
  //   icon: <ApiOutlined />,
  //   name: "IDS_PROJECTS",
  //   pathname: routes.PROJECTS,
  //   isShow: true,
  // },
  {
    icon: <HomeOutlined />,
    name: "IDS_DASHBOARD",
    pathname: routes.DASHBOARD,
    isShow: true,
    hasSubmenu: false,
    submenu: [
      {
        icon: <ApiOutlined />,
        name: "IDS_DASHBOARD_PROJECTS",
        pathname: routes.DASHBOARD_MENU.PROJECTS,
        isShow: true,
      }
    ]
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
    name: 'Vindr ChestXray',
    key: 'chestxray'
  },
  {
    name: 'Vindr Mammo',
    key: 'mammo'
  },
  {
    name: 'Vindr SpineXR',
    key: 'spinexr'
  },
  {
    name: 'Vindr LungCT',
    key: 'lungct'
  },
  {
    name: 'Vindr LiverCT',
    key: 'liverct'
  },
  {
    name: 'Vindr BrainCT',
    key: 'brainct'
  },
  {
    name: 'Vindr BrainMRI',
    key: 'brainmri'
  }
]

export const CHART_COLORS = {
  lungct: '#97DAFF',
  mammogram: '#eb34b1',
  chestxray: '#AAFAD8',
  liverct: '#FFC552',
  brainct: '#eb4c34',
  brainmri: '#344feb',
  spinexr: '#C4B5FF'
};


export const PAGES_HAS_NO_LAYOUT = ['/', '/projects']