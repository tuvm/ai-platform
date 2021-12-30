import React from 'react';
import { Tabs } from 'antd';
import UserList from './UserList';
import Profile from './Profile';
import UserManagement from './UserManagement';

const { TabPane } = Tabs;

export default function Users() {
  // const callback = () => {};

  return (
    <>
      <Tabs defaultActiveKey="1">
        <TabPane tab="User Profile" key="1">
          <Profile />
        </TabPane>

        <TabPane tab="Users Management" key="2">
          <UserList />
        </TabPane>
      </Tabs>
    </>
  );
}
