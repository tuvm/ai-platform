import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { Row, Col } from "antd";
import { Table, Space, Modal, notification, Spin } from 'antd';
import get from 'lodash/get';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { actionGetAPIKeys, actionRevokeAPIKey } from './actions';
import { KEY_LIST } from '../../utils/constants/config';

import "./GenerateToken.scss";

const { Column } = Table;


export default function GenerateToken() {
  const [itemRevoked, setItemRevoked] = useState();
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const apikeys = useSelector(state => state.system.apikeys);
  const { t } = useTranslation();

  const handleRevoke = item => {
    setItemRevoked(item);
    setShowConfirm(true);
  }

  const handleOk = () => {
    const params = { key_id: itemRevoked.key_id }
    setLoading(true);

    actionRevokeAPIKey({ params }).then(res => {
      setLoading(false);
      setShowConfirm(false);
      actionGetAPIKeys();
      notification.success({
        description: t('IDS_API_KEY_REVOKE_SUCCESS')
      });
    }).catch(error => {
      setLoading(false);
      setShowConfirm(false);
      notification.error({ description: t('IDS_ERROR_MESSAGE') });
    });
  }

  const handleCancel = () => {
    setShowConfirm(false);
  }


  useEffect(() => {
    actionGetAPIKeys();
  }, []);

  return (
    <Row gutter={16}>
      <Col sm={24} md={7}>
        <div className="generate-token-left-side">
          <h4>Access Token</h4>
          <p>
            You can generate a personal access token for each application you
            use that needs access to the VinDr AI Platform.
          </p>
        </div>
      </Col>
      <Col sm={24} md={17}>
        <div className="generate-token-right-side">
          <Spin spinning={loading}>
            <Table dataSource={apikeys}>
              <Column title="Name" dataIndex="name" key="name" />
              <Column title="Created" dataIndex="creation_time" key="creation_time" render={text => moment(text).format('MM-DD-YYYY HH:mm:ss')} />
              <Column title="Scopes" dataIndex="scope" key="scope" render={array => renderKeyList(array).join(', ')} />
              <Column
                title="Action"
                dataIndex="action"
                key="action"
                render={(text, record) => (
                  <Space size="middle">
                    {!record.revoked && <Button type="primary" danger onClick={() => handleRevoke(record)}>
                      Revoke
                </Button>}
                  </Space>
                )}
              />
            </Table>
            {showConfirm && <Modal title="Revoke your access token" visible={true} onOk={handleOk} onCancel={handleCancel}>
              <p>Are you sure you want to revoke this access token? This action cannot be undone.</p>
            </Modal>}
          </Spin>
        </div>
      </Col>
    </Row>
  );
}

function renderKeyList(keyList) {
  const names = keyList.map(name => KEY_LIST[name])
  return names || []
}
