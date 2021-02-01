import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { Row, Col } from "antd";
import { Table, Space, Modal, notification } from 'antd';
import get from 'lodash/get';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { actionGetTokenList, actionRevokeAPIKey } from './actions';
import { actionShowLoading, actionHideLoading } from '../system/systemAction';
import { KEY_LIST } from '../../utils/constants/config';
import "./GenerateToken.scss";

const { Column } = Table;


export default function GenerateToken() {
  const [APIKeyList, setAPIKeyList] = useState([]);
  const [itemRevoked, setItemRevoked] = useState();
  const [showConfirm, setShowConfirm] = useState(false);
  const { t } = useTranslation();

  const callGetTokenList = async () => {
    const res = await actionGetTokenList();
    if (res && res.data) {
      const data = get(res, 'data.data');
      setAPIKeyList(data);
    }
  }

  const handleRevoke = item => {
    setItemRevoked(item);
    setShowConfirm(true);
  }

  const handleOk = () => {
    const params = { key_id: itemRevoked.key_id }
    actionShowLoading();

    actionRevokeAPIKey({ params }).then(res => {
      actionHideLoading();
      setShowConfirm(false);
      notification.success({
        description: t('IDS_API_KEY_REVOKE_SUCCESS')
      });
    }).catch(error => {
      actionHideLoading();
      setShowConfirm(false);
      notification.error({ description: t('IDS_ERROR_MESSAGE') });
    });
  }

  const handleCancel = () => {
    setShowConfirm(false);
  }


  useEffect(() => {
    callGetTokenList();
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
          <Table dataSource={APIKeyList}>
            <Column title="Name" dataIndex="name" key="name" />
            <Column title="Created" dataIndex="creation_time" key="creation_time" render={text => moment(text).format('YYYY-MM-DD')} />
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
        </div>
      </Col>
    </Row>
  );
}

function renderKeyList(keyList) {
  const names = keyList.map(name => KEY_LIST[name])
  return names || []
}
