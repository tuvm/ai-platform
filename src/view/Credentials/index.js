import React from 'react';
import { Tabs, Button, Typography } from 'antd';
import { KeyOutlined } from '@ant-design/icons';
import CredentialDev from './CredentialDev';
import './Credentials.scss';


const { Title } = Typography;

export default function Analysis() {
    const { TabPane } = Tabs;
    return (
        <div className="credential-page content-inner-center">
            <div className="credential-head">
                <Title level={4}>Your API keys</Title>
                <Button type="primary" icon={<KeyOutlined />}>
                    Create Credential
                </Button>
            </div>
            <div className="credential-tabs">
                <Tabs tabPosition="left">
                    <TabPane tab="Đa khoa Phú Thọ - DEV" key="1">
                        <CredentialDev />
                    </TabPane>
                    <TabPane tab="Đa khoa Phú Thọ - PROD" key="2">
                        Đa khoa Phú Thọ - PROD
                    </TabPane>
                </Tabs>
            </div>
        </div>
    );
}