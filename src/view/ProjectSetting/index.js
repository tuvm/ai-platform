import React, { useState } from 'react';
import { Tabs, Button, Typography } from 'antd';
import { KeyOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import CreateCredentialModal from './CreateCredentialModal';
import CredentialDev from './CredentialDev';
import './Credentials.scss';


const { Title } = Typography;

export default function ProjectSetting() {
    const [openModal, setOpenModal] = useState(false);
    const { TabPane } = Tabs;
    const { t } = useTranslation();

    const handleOpenModal = () => {
        setOpenModal(true)
    }

    return (
        <div className="credential-page content-inner-center">
            <div className="credential-head">
                <Title level={4}>Your API keys</Title>
                <Button type="primary"
                    icon={<KeyOutlined />}
                    onClick={handleOpenModal}
                >
                    {t('IDS_CREATE_CREDENTIAL')}
                </Button>
            </div>
            <div className="credential-tabs">
                <Tabs tabPosition="left">
                    <TabPane tab="Đa khoa Phú Thọ - DEV" key="1">
                        <CredentialDev />
                    </TabPane>
                    <TabPane tab="Đa khoa Phú Thọ - PROD" key="2">
                        <CredentialDev />
                    </TabPane>
                </Tabs>
            </div>
            {openModal && <CreateCredentialModal onCancel={() => setOpenModal(false)}/>}
        </div>
        
    );
}