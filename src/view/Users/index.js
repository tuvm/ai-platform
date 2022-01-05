import React from 'react';
import { Tabs } from 'antd';
import Profile from './Profile';
import UserManagement from './UserManagement';

const { TabPane } = Tabs;

export default function Users() {
  // const callback = () => {};

  return (
    <div style={{ maxWidth: 960, margin: '0 auto' }}>
      <Tabs defaultActiveKey="1">
        <TabPane tab="User Profile" key="1">
          <Profile />
        </TabPane>

        <TabPane tab="Users Management" key="2">
          <UserManagement />
        </TabPane>
      </Tabs>
    </div>
  );
}
