import React, { useState } from 'react';
import { Input, Space, message, Button, Empty } from 'antd';
import { Typography, Table, Modal } from 'antd';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import EditCredentialModal from './EditCredentialModal';
import { ENV_OPTIONS } from '../../../utils/constants/config'
import { actionDeleteCredential, actionRevokeCredential } from './actions'
import './Credentials.scss';

import {
    CopyOutlined
} from '@ant-design/icons';

const { Column } = Table;

const { Title, Text } = Typography;


export default function CredentialContent({ data, handleGetCredentials }) {
    const { t } = useTranslation();
    const [openEditCredentialModal, setOpenEditCredentialModal] = useState(false);
    const [openConfirmDeleteModal, setOpenConfirmDeleteModal] = useState(false);
    const [openConfirmRevokeModal, setOpenConfirmRevokeModal] = useState(false);
    const [confirmDeleteLoading, setConfirmDeleteLoading] = useState(false);
    const [confirmRevokeLoading, setConfirmRevokeLoading] = useState(false);



    const handleCopy = () => {
        navigator.clipboard.writeText(data.token).then(function () {
            message.success('Copied API key');
        }, function (err) {
            message.error('Could not copy API Key: ');
        });
    }

    const handleCloseEditCredential = () => {
        setOpenEditCredentialModal(false)
    }

    const handleOpenEditCredential = () => {
        setOpenEditCredentialModal(true)
    }

    const handleDeleteModal = () => {
        setOpenConfirmDeleteModal(true)
    }

    const handleRevokeModal = () => {
        setOpenConfirmRevokeModal(true)
    }

    const handleDelete = async () => {
        const res = await actionDeleteCredential({ payload: data })
        if (res.status === 200) {
            message.success('Delete credential successfully.');
            setOpenConfirmDeleteModal(false);
            handleGetCredentials();
        }
    }

    const handleCancelDelete = () => {
        setOpenConfirmDeleteModal(false)
    }

    const handleRevoke = async () => {
        const res = await actionRevokeCredential({ payload: data })
        if (res.status === 200) {
            message.success('Revoke credential successfully.');
            setOpenConfirmRevokeModal(false);
            handleGetCredentials();
        }
    }

    const handleCancelRevoke = () => {
        setOpenConfirmRevokeModal(false)
    }

    if (!data) {
        return (<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />)
    }

    return (
        <>
            <div>
                <Space direction="vertical">
                    <Title level={5}>{data.name}</Title>
                    <Text>Evironment: {ENV_OPTIONS[data.environment]}</Text>
                    <Text>Create time: {moment(data.create_time).format('MM-DD-YYYY HH:mm:ss')}</Text>
                    <Text>End time: {moment(data.end_time).format('MM-DD-YYYY HH:mm:ss')}</Text>
                    <Text>Status: <Text type={`${data.status === 1 ? 'success' : 'danger'}`}>
                        {data.status === 1 ? t('IDS_ACTIVE') : t('IDS_DEACTIVE')}
                    </Text>
                    </Text>
                </Space>
            </div>
            <div className="credential-key-input">
                <Input value={data.token} style={{ paddingRight: '40px' }} disabled />
                <CopyOutlined
                    style={{ fontSize: '20px' }}
                    className="copy-button"
                    onClick={handleCopy}
                />
            </div>

            <div className="credential-quotations-table">
                <Space direction="vertical">
                    <Text strong>API quotations</Text>
                    <Text type="secondary">Limit the number of requests you can make to call API in the period</Text>
                </Space>

                <Table dataSource={data.request_data} className="app-table quotation-table" pagination={false}>
                    <Column title="API Name" dataIndex="name" key="name" />
                    <Column title="Quota" dataIndex="quota" key="quota" />
                    <Column title="Period" dataIndex="period" key="period" />
                </Table>
            </div>

            <div className="credential-footer">
                <Space size={16}>
                    <Button type="" danger onClick={handleDeleteModal}>Delete</Button>
                    <Button type="" onClick={handleRevokeModal} disabled={!Boolean(data.status)}>Revoke</Button>
                    <Button type="primary" onClick={handleOpenEditCredential} disabled={!Boolean(data.status)}>Edit</Button>
                </Space>
            </div>

            {
                openEditCredentialModal && <EditCredentialModal
                    onCancel={handleCloseEditCredential}
                    handleGetCredentials={handleGetCredentials}
                    data={data}
                />
            }

            {
                openConfirmDeleteModal && <Modal
                    title={t('IDS_CONFIRMATION')}
                    visible={true}
                    onOk={handleDelete}
                    confirmLoading={confirmDeleteLoading}
                    onCancel={handleCancelDelete}
                >
                    <p>{t('IDS_CONFIRM_DELETE_CREDENTIAL_MESSAGE')}</p>
                </Modal>
            }

            {
                openConfirmRevokeModal && <Modal
                    title={t('IDS_CONFIRMATION')}
                    visible={true}
                    onOk={handleRevoke}
                    confirmLoading={confirmRevokeLoading}
                    onCancel={handleCancelRevoke}
                >
                    <p>{t('IDS_CONFIRM_REVOKE_CREDENTIAL_MESSAGE')}</p>
                </Modal>
            }
        </>
    );
}