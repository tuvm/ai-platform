import React from 'react';
import { Tabs } from 'antd';
import Overview from './Overview';
import Rules from './Rules';
import ModelSettings from './ModelSetting';
import Docs from './Docs';

const { TabPane } = Tabs;

export default function ModelPage() {
  // const callback = () => {};

  return (
    <div>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Overview" key="1">
          <Overview />
        </TabPane>
        <TabPane tab="Rules" key="2">
          <Rules />
        </TabPane>
        <TabPane tab="Settings" key="3">
          <ModelSettings />
        </TabPane>
        <TabPane tab="Docs" key="4">
          <Docs />
        </TabPane>
      </Tabs>
    </div>
  );
}
