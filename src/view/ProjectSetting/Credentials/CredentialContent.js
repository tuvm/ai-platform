import React, { useState, useContext } from 'react';
import { Input, Space, message, Button, Empty } from 'antd';
import { Typography, Table, Modal } from 'antd';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import EditCredentialModal from './EditCredentialModal';
import {
  ENV_OPTIONS,
  getPeriodSelected,
} from '../../../utils/constants/config';
import { actionDeleteCredential, actionRevokeCredential } from './actions';
import { useSelector } from 'react-redux';
import { CredentialContext } from './context';
import get from 'lodash/get';
import { getModuleName } from '../../../utils/constants/config';
import './Credentials.scss';

import { CopyOutlined } from '@ant-design/icons';
import {
  PERM_CREDENTIAL_DELETE,
  PERM_CREDENTIAL_EDIT,
  PERM_CREDENTIAL_REVOKE,
} from '../../../utils/permission/perms';
import UserService from '../../system/userService';

const { Column } = Table;

const { Title, Text } = Typography;

export default function CredentialContent() {
  const { t } = useTranslation();
  const [openEditCredentialModal, setOpenEditCredentialModal] = useState(false);
  const [openConfirmDeleteModal, setOpenConfirmDeleteModal] = useState(false);
  const [openConfirmRevokeModal, setOpenConfirmRevokeModal] = useState(false);
  const ticket = useSelector((state) => state.system.ticket);
  const resourceList = useSelector((state) => state.system.resourceList);
  const vindrModules = get(resourceList, 'modules');
  const { handleGetCredentials, currentCredential } =
    useContext(CredentialContext);

  const canEdit = () => {
    return UserService.hasPerm(ticket, [PERM_CREDENTIAL_EDIT]);
  };

  const canRevoke = () => {
    return UserService.hasPerm(ticket, [PERM_CREDENTIAL_REVOKE]);
  };

  const canDelete = () => {
    return UserService.hasPerm(ticket, [PERM_CREDENTIAL_DELETE]);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCredential.token).then(
      function () {
        message.success(t('IDS_COPY_API_KEY'));
      },
      function (err) {
        message.error('IDS_CREDENTIAL_CANNOT_COPY_API_KEY');
      }
    );
  };

  const handleCloseEditCredential = () => {
    setOpenEditCredentialModal(false);
  };

  const handleOpenEditCredential = () => {
    setOpenEditCredentialModal(true);
  };

  const handleDeleteModal = () => {
    setOpenConfirmDeleteModal(true);
  };

  const handleRevokeModal = () => {
    setOpenConfirmRevokeModal(true);
  };

  const handleDelete = async () => {
    const res = await actionDeleteCredential({ payload: currentCredential });
    if (res.status === 200) {
      message.success(t('IDS_CREDENTIAL_DELETE_SUCCESS'));
      setOpenConfirmDeleteModal(false);
      handleGetCredentials();
    }
  };

  const handleCancelDelete = () => {
    setOpenConfirmDeleteModal(false);
  };

  const handleRevoke = async () => {
    const res = await actionRevokeCredential({ payload: currentCredential });
    if (res.status === 200) {
      message.success(t('IDS_CREDENTIAL_REVOKE_SUCCESS'));
      setOpenConfirmRevokeModal(false);
      handleGetCredentials();
    }
  };

  const handleCancelRevoke = () => {
    setOpenConfirmRevokeModal(false);
  };

  if (!currentCredential) {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
  }

  return (
    <>
      <div>
        <Space direction="vertical">
          <Title level={5}>{currentCredential.name}</Title>
          <Text>Evironment: {ENV_OPTIONS[currentCredential.environment]}</Text>
          <Text>
            Creation time:{' '}
            {moment(currentCredential.create_time).format(
              'MMM, D YYYY, h:mm:ss A'
            )}
          </Text>
          <Text>
            End time:{' '}
            {moment(currentCredential.end_time).format(
              'MMM, D YYYY, h:mm:ss A'
            )}
          </Text>
          <Text>
            Status:{' '}
            <Text
              type={`${currentCredential.status === 1 ? 'success' : 'danger'}`}
            >
              {currentCredential.status === 1
                ? t('IDS_ACTIVE')
                : t('IDS_DEACTIVE')}
            </Text>
          </Text>
        </Space>
      </div>
      <div className="credential-key-input">
        <Input
          value={currentCredential.token}
          style={{ paddingRight: '40px' }}
          disabled
        />
        <CopyOutlined
          style={{ fontSize: '20px' }}
          className="copy-button"
          onClick={handleCopy}
        />
      </div>

      <div className="credential-quotations-table">
        <Space direction="vertical">
          <Text strong>API quotations</Text>
          <Text type="secondary">
            Limit the number of requests you can make to call API in the period
          </Text>
        </Space>

        <Table
          dataSource={currentCredential.request_data}
          className="app-table quotation-table"
          pagination={false}
        >
          <Column
            title="API Name"
            dataIndex="name"
            key="name"
            render={(name) => <>{getModuleName(vindrModules, name).name}</>}
          />
          <Column title="Quota" dataIndex="quota" key="quota" />
          <Column
            title="Period"
            dataIndex="period"
            key="period"
            render={(period) => <>{getPeriodSelected(period).label}</>}
          />
        </Table>
      </div>

      <div className="credential-footer">
        <Space size={16}>
          {canDelete() && (
            <Button type="" danger onClick={handleDeleteModal}>
              Delete
            </Button>
          )}
          {canRevoke() && (
            <Button
              type=""
              onClick={handleRevokeModal}
              disabled={!Boolean(currentCredential.status)}
            >
              Revoke
            </Button>
          )}
          {canEdit() && (
            <Button
              type="primary"
              onClick={handleOpenEditCredential}
              disabled={!Boolean(currentCredential.status)}
            >
              Edit
            </Button>
          )}
        </Space>
      </div>

      {openEditCredentialModal && (
        <EditCredentialModal onCancel={handleCloseEditCredential} />
      )}

      {openConfirmDeleteModal && (
        <Modal
          title={t('IDS_CONFIRMATION')}
          visible={true}
          onOk={handleDelete}
          onCancel={handleCancelDelete}
        >
          <p>{t('IDS_CONFIRM_DELETE_CREDENTIAL_MESSAGE')}</p>
        </Modal>
      )}

      {openConfirmRevokeModal && (
        <Modal
          title={t('IDS_CONFIRMATION')}
          visible={true}
          onOk={handleRevoke}
          onCancel={handleCancelRevoke}
        >
          <p>{t('IDS_CONFIRM_REVOKE_CREDENTIAL_MESSAGE')}</p>
        </Modal>
      )}
    </>
  );
}
