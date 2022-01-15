import { actionGetCredentialList } from '../ProjectSetting/Credentials/actions';
import { actionInspectProjectTicket } from './systemAction';

export const initProject = (projectId) => (dispatch) => {
  dispatch(actionGetCredentialList(projectId));
  dispatch(actionInspectProjectTicket(projectId));
};
