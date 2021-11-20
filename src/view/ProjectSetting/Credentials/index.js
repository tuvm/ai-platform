import React, { useState, useEffect } from 'react';
import { Button, Typography, Space, Row, Col } from 'antd';
import { KeyOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import get from 'lodash/get';
import { matchPath } from 'react-router';
import CreateCredentialModal from './CreateCredentialModal';
import CredentialDev from './CredentialDev';
import { actionGetCredentialList } from './actions';
import './Credentials.scss';


const { Title } = Typography;

export default function Credentials() {
    const [openModal, setOpenModal] = useState(false);
    const { t } = useTranslation();
    const location = useLocation();
    const [credentialList, setCredentialList] = useState([]);
    const [currentCredential, setCurrentCredential] = useState({});

    const { pathname } = location;

    const match = matchPath(pathname, {
        path: '/projects/:projectId/*',
        exact: true,
        strict: false
    });

    const projectId = get(match, 'params.projectId', '');

    const handleGetCredentials = async () => {
        const data = await actionGetCredentialList({ params: { project_id: projectId } })
        if (data) {
            setCredentialList(data);
            setCurrentCredential(data[0])
        }
    }

    useEffect(() => {
        handleGetCredentials()
    }, [])

    const handleOpenModal = () => {
        setOpenModal(true)
    }

    const handleChangeMenu = credential => {
        const finder = credentialList.find(item => item.id === credential.id)
        setCurrentCredential(finder)
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
                <Row gutter={16}>
                    <Col xs={24} md={6}>
                        <ul className="credential-list-item">
                            {credentialList && credentialList && credentialList.map(item => (
                                <li key={item.id}
                                onClick={() => handleChangeMenu(item)}
                                className={`${currentCredential && currentCredential.id === item.id ? 'active' : ''}`}><KeyOutlined /> {item.name}</li>
                            ))}
                        </ul>
                    </Col>

                    <Col xs={24} md={18}>
                        <div className="credential-content"><CredentialDev data={currentCredential} /></div>
                    </Col>
                </Row>
            </div>
            {openModal && <CreateCredentialModal
                onCancel={() => setOpenModal(false)}
                handleGetCredentials={handleGetCredentials}
            />}
        </div>
    );
}