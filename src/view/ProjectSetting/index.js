import React, { useEffect } from 'react';
import { Tabs } from 'antd';
import Credentials from './Credentials';
import Permissions from './Permissions';
import { actionGetResourceList } from './Credentials/actions';
import { useDispatch } from 'react-redux';

const { TabPane } = Tabs;

export default function Analysis() {
  const callback = () => { }
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actionGetResourceList({ params: { project_id: '13232'} }))
  },[dispatch]);

  return (
    <>
      <Tabs defaultActiveKey="1" onChange={callback}>
        {/* <TabPane tab="General" key="1">
          General
        </TabPane> */}

        <TabPane tab="Credentials" key="2">
          <Credentials />
        </TabPane>

        <TabPane tab="Users and permissions" key="3">
            <Permissions />
        </TabPane>
      </Tabs>
    </>
  );
}