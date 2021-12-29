import React, { useState, useEffect, useCallback } from 'react';
import { Button, Typography, Row, Col, Empty } from 'antd';
import { KeyOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import get from 'lodash/get';
import { useSelector } from 'react-redux';
import CreateCredentialModal from './CreateCredentialModal';
import CredentialContent from './CredentialContent';
import { useProjectsParams } from '../../../utils/hooks';
import { actionGetCredentialList } from './actions';
import { CredentialContext } from './context';
import './Credentials.scss';
import { PERM_CREDENTIAL_CREATE } from '../../../utils/permission/perms';
import UserService from '../../system/userService';

const { Title } = Typography;

export default function Credentials() {
  const [openCreateCredentialModal, setOpenCreateCredentialModal] =
    useState(false);
  const ticket = useSelector((state) => state.system.ticket);
  const { t } = useTranslation();
  const [credentialList, setCredentialList] = useState([]);
  const [currentCredential, setCurrentCredential] = useState({});
  const { params } = useProjectsParams();

  const projectId = get(params, 'projectId', '');

  const canCreateCredentials = () => {
    return UserService.hasPerm(ticket, [PERM_CREDENTIAL_CREATE]);
  };

  const handleGetCredentials = useCallback(async () => {
    const data = await actionGetCredentialList({
      params: { project_id: projectId },
    });
    if (data) {
      // sort activated credentitals first
      data.sort((it1, it2) =>
        it1.status < it2.status
          ? 1
          : it1.status > it2.status
          ? -1
          : it1.end_time < it2.end_time
          ? 1
          : it1.end_time > it2.end_time
          ? -1
          : 0
      );
      setCredentialList(data);
      if (!get(currentCredential, 'id')) {
        setCurrentCredential(data[0]);
      } else {
        const finder = data.find((item) => item.id === currentCredential.id);
        if (finder) {
          setCurrentCredential(finder);
        } else {
          setCurrentCredential(data[0]);
        }
      }
    }
  }, [currentCredential, projectId]);

  useEffect(() => {
    handleGetCredentials();
  }, [handleGetCredentials]);

  const handleCreateCredentialModal = () => {
    setOpenCreateCredentialModal(true);
  };

  const handleChangeMenu = (credential) => {
    const finder = credentialList.find((item) => item.id === credential.id);
    setCurrentCredential(finder);
  };

  const handleCloseCreateCredential = () => {
    setOpenCreateCredentialModal(false);
  };

  const contextValues = {
    credentialList,
    currentCredential,
    handleGetCredentials,
  };

  return (
    <div className="credential-page content-inner-center">
      <CredentialContext.Provider value={contextValues}>
        <div className="credential-head">
          <Title level={4}>Your API keys</Title>
          {canCreateCredentials() && (
            <Button
              type="primary"
              icon={<KeyOutlined />}
              onClick={handleCreateCredentialModal}
            >
              {t('IDS_CREATE_CREDENTIAL')}
            </Button>
          )}
        </div>

        {!credentialList || credentialList.length === 0 ? (
          <div className="empty-list">
            <Empty />
          </div>
        ) : (
          <div className="credential-tabs">
            <Row gutter={16}>
              <Col xs={24} md={6}>
                <ul className="credential-list-item">
                  {credentialList &&
                    credentialList &&
                    credentialList.map((item) => (
                      <li
                        key={item.id}
                        onClick={() => handleChangeMenu(item)}
                        className={`${
                          currentCredential && currentCredential.id === item.id
                            ? 'active'
                            : ''
                        }`}
                      >
                        <KeyOutlined /> {item.name}
                      </li>
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
          </div>
        )}
        {openCreateCredentialModal && (
          <CreateCredentialModal
            onCancel={handleCloseCreateCredential}
            handleGetCredentials={handleGetCredentials}
          />
        )}
      </CredentialContext.Provider>
    </div>
  );
}
