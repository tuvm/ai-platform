import React from 'react';
import { Tabs } from 'antd';
// import Devider from '../../components/devider';
// import GenerateToken from './GenerateToken';
// import TokenList from './TokenList'
import Credentials from '../Credentials';

const { TabPane } = Tabs;

export default function Analysis() {
  const callback = () => { }
  return (
    <>
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="General" key="1">
          General
        </TabPane>

        <TabPane tab="Credentials" key="2">
          <Credentials />
        </TabPane>

        <TabPane tab="Users and permissions" key="3">
            Users and permissions
        </TabPane>
      </Tabs>
    </>
  );
}