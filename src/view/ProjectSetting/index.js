import React, { useEffect } from 'react';
import { Tabs } from 'antd';
import Credentials from './Credentials';
import Permissions from './Permissions';
import General from './General';
import { actionGetResourceList } from './Credentials/actions';
import { useDispatch, useSelector } from 'react-redux';
// import { actionInspectTicket } from '../system/systemAction';
import {
  PERM_USER_PROJECT_GET,
  PERM_CREDENTIAL_GET,
} from '../../utils/permission/perms';
import { useProjectsParams } from '../../utils/hooks';
import get from 'lodash/get';
import UserService from '../system/userService';

const { TabPane } = Tabs;

export default function Analysis() {
  const callback = () => {};
  const dispatch = useDispatch();
  const ticket = useSelector((state) => state.system.ticket);
  const { params: projectParams } = useProjectsParams();
  const projectId = get(projectParams, 'projectId', '');

  useEffect(() => {
    // dispatch(actionInspectTicket({ project_id: projectId }));
    dispatch(actionGetResourceList({ params: { project_id: projectId } }));
  }, [dispatch, projectId]);

  const canViewUsers = () => {
    return UserService.hasPerm(ticket, [PERM_USER_PROJECT_GET]);
  };

  const canViewCredentials = () => {
    return UserService.hasPerm(ticket, [PERM_CREDENTIAL_GET]);
  };

  return (
    <>
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="General" key="1">
          <General />
        </TabPane>

        {canViewCredentials() && (
          <TabPane tab="Credentials" key="2">
            <Credentials />
          </TabPane>
        )}

        {canViewUsers() && (
          <TabPane tab="Users and permissions" key="3">
            <Permissions />
          </TabPane>
        )}
      </Tabs>
    </>
  );
}
