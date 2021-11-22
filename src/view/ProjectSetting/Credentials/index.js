import React, { useState, useEffect } from 'react';
import { Button, Typography, Row, Col, Empty } from 'antd';
import { KeyOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import get from 'lodash/get';
import CreateCredentialModal from './CreateCredentialModal';
import CredentialContent from './CredentialContent';
import { useProjectsParams } from '../../../utils/hooks';
import { actionGetCredentialList } from './actions';
import './Credentials.scss';


const { Title } = Typography;

export default function Credentials() {
    const [openCreateCredentialModal, setOpenCreateCredentialModal] = useState(false);
    const { t } = useTranslation();
    const [credentialList, setCredentialList] = useState([]);
    const [currentCredential, setCurrentCredential] = useState({});
    const { params } = useProjectsParams();

    const projectId = get(params, 'projectId', '');

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

    const handleCreateCredentialModal = () => {
        setOpenCreateCredentialModal(true)
    }

    const handleChangeMenu = credential => {
        const finder = credentialList.find(item => item.id === credential.id)
        setCurrentCredential(finder)
    }

    const handleCloseCreateCredential = () => {
        setOpenCreateCredentialModal(false)
    }

    return (
        <div className="credential-page content-inner-center">
            <div className="credential-head">
                <Title level={4}>Your API keys</Title>
                <Button type="primary"
                    icon={<KeyOutlined />}
                    onClick={handleCreateCredentialModal}
                >
                    {t('IDS_CREATE_CREDENTIAL')}
                </Button>
            </div>

            {!credentialList || credentialList.length === 0 ? <div className="empty-list"><Empty /></div> : <div className="credential-tabs">
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
                        <div className="credential-content">
                            <CredentialContent
                                data={currentCredential}
                                handleGetCredentials={handleGetCredentials}
                            />
                        </div>
                    </Col>
                </Row>
            </div>}
            {openCreateCredentialModal && <CreateCredentialModal
                onCancel={handleCloseCreateCredential}
                handleGetCredentials={handleGetCredentials}
            />}
        </div>
    );
}